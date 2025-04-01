import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

export async function GET() {
    try {
        const snapshot = await getDocs(collection(db, "posts"));
        const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json(
            { status: 200, message: "Fetched posts", data: posts },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { status: 500, message: "Error fetching posts", error: error },
            { status: 500 }
        );
    }
}
