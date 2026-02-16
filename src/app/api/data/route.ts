import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { portfolioData as defaultData } from "@/lib/data";

// Force dynamic rendering - prevent Next.js from caching GET responses
export const dynamic = "force-dynamic";
export const revalidate = 0;

const COLLECTION = "portfolio";
const DOC_ID = "data";

// GET - Fetch data from Firestore
export async function GET() {
    try {
        const docRef = adminDb.collection(COLLECTION).doc(DOC_ID);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            return NextResponse.json(docSnap.data());
        } else {
            console.log("No data found in Firestore, returning defaults");
            return NextResponse.json(defaultData);
        }
    } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        return NextResponse.json(defaultData);
    }
}

// POST - Save data to Firestore
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const docRef = adminDb.collection(COLLECTION).doc(DOC_ID);

        await docRef.set(data);

        console.log("Data saved to Firestore successfully");
        return NextResponse.json({ success: true });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("Error saving data to Firestore:", errorMessage);

        return NextResponse.json(
            { error: "Failed to save data", details: errorMessage },
            { status: 500 }
        );
    }
}
