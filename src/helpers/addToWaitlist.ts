import { db } from "@/lib/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export const addToWaitlist = async (email: string) => {
  try {
    await addDoc(collection(db, "waitlist"), {
      email: email,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error adding to waitlist:", error);
  }
};
