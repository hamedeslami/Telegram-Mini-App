import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { title, description, category, image_url } = data;

        if (!title || !description || !category) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "All fields are required",
                    data: null,
                },
                { status: 400 }
            );
        }

        const token = (await cookies()).get("AUTH_USER_TOKEN")?.value;
        if (token) {
            const decoded = jwt.decode(token) as { firstname?: string, lastname: string } | null;
            await addDoc(collection(db, "posts"), {
                title,
                description,
                category,
                image_url,
                author: `${decoded?.firstname} ${decoded?.lastname}`,
                created_at: new Date(),
            });

            return NextResponse.json(
                {
                    status: 200,
                    message: "post create successfully!",
                    data: null
                },
                { status: 200 }
            );
        }
        return NextResponse.json(
            {
                status: 401,
                message: "token not valid",
                data: null,
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