import { db } from "@/lib/firebase/config";
import { TSubscription } from "@/types/payment";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserSubscription = async (
  userId: string,
  newSubscription: TSubscription
): Promise<void> => {
  try {
    const userDocRef = doc(db, "users", userId);

    // Update the paystack_id field
    await updateDoc(userDocRef, {
      subscription: newSubscription,
    });

    // console.log(`Updated subscription for user ${userId}`);
  } catch (error) {
    // console.error("Error updating Firestore user:", error);
    throw error;
  }
};
