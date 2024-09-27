import { db } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserPaystackId = async (
  userId: string,
  paystackId: string
): Promise<void> => {
  try {
    const userDocRef = doc(db, "users", userId);

    // Update the paystack_id field
    await updateDoc(userDocRef, {
      paystack_id: paystackId,
    });

    // console.log(`Updated paystack_id for user ${userId}`);
  } catch (error) {
    // console.error("Error updating Firestore user:", error);
    throw error;
  }
};
