import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { hashPassword } from "@/utils/passwordHasher";
import { db } from "@/config/firebase";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { firstname, lastname, username, password } = data;

        if (!firstname || !lastname || !username || !password) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "All fields are required",
                    data: null,
                },
                { status: 400 }
            );
        }

        const user = await findUserByUsername(username)

        if (user) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "Username is already taken!",
                    data: null,
                },
                { status: 400 }
            );
        }

        const hashedPassword = hashPassword(password);

        const userRef = doc(db, "users", username);
        await setDoc(userRef, {
            firstname,
            lastname,
            username,
            password: hashedPassword,
            created_at: new Date(),
        });

        const payload = {
            firstname,
            lastname,
        };

        const token = await createToken(payload);

        return NextResponse.json(
            {
                status: 200,
                message: "User registered successfully!",
                data: {
                    ...payload,
                    accessToken: token
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                status: 500,
                message: error,
                data: null,
            },
            { status: 500 }
        );
    }
}


const createToken = async (payload: object) => {
    const PrivateKey = process.env.TOKEN_PRIVATE_KEY;
        const options = {
            expiresIn: 60 * 10
        }

        if (!PrivateKey){
            return NextResponse.json(
                {
                    status: 500,
                    message: "private key not found",
                    data: null,
                },
                { status: 500 }
            );
        }

        const token = jwt.sign(payload, PrivateKey, options);
        return token;
}

const findUserByUsername = async (username: string) => {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        return null;
    }

    const userData = userSnap.data();
    return userData;
}