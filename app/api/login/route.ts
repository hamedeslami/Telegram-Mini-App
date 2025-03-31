import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { verifyPassword } from "@/utils/passwordHasher";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { username, password } = data;

        if (!username || !password) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "All fields are required",
                    data: null,
                },
                { status: 400 }
            );
        }

        const user = await findUserByUsername(username);
        if (user) {
            const result = verifyPassword(password, user.password);
            if (result) {
                const payload = {
                    firstname: user.firstname,
                    lastname: user.lastname,
                };
                const token = await createToken(payload);
                return NextResponse.json(
                    {
                        status: 200,
                        message: "User login successfully!",
                        data: {
                            ...payload,
                            accessToken: token
                        },
                    },
                    { status: 200 }
                );
            }
            return NextResponse.json(
                {
                    status: 401,
                    message: "username or password not correct!",
                    data: null,
                },
                { status: 401 }
            );
        }
        return NextResponse.json(
            {
                status: 401,
                message: "user not found",
                data: null,
            },
            { status: 401 }
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

const findUserByUsername = async (username: string) => {
    const userRef = doc(db, "users", username);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        return null;
    }

    const userData = userSnap.data();
    return userData;
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