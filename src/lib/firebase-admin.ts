import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let app: App;

// Initialize Firebase Admin (for server-side use in API routes)
if (getApps().length === 0) {
    // For Vercel, we use environment variables
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

    if (!projectId) {
        throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set");
    }

    // Check if we have service account credentials
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccountKey) {
        // Use service account for full access
        const serviceAccount = JSON.parse(serviceAccountKey);
        app = initializeApp({
            credential: cert(serviceAccount),
            projectId,
            storageBucket,
        });
    } else {
        // Use Application Default Credentials (works in some environments)
        app = initializeApp({
            projectId,
            storageBucket,
        });
    }
} else {
    app = getApps()[0];
}

export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);
export default app;
