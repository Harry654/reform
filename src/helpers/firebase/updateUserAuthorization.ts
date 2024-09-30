import { db } from "@/lib/firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export const updateUserAuthorization = async (
  userId: string,
  authorization: string
): Promise<void> => {
  try {
    const userDocRef = doc(db, "users", userId);

    // Update the paystack_id field
    await updateDoc(userDocRef, {
      paystack_authorization: authorization,
    });

    // console.log(`Updated paystack_authorization for user ${userId}`);
  } catch (error) {
    // console.error("Error updating Firestore user:", error);
    throw error;
  }
};
