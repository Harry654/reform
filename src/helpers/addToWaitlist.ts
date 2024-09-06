import { db } from "@/lib/firebase/config";
import { collection, addDoc, query, getDocs, where, Timestamp } from "firebase/firestore";

export const addToWaitlist = async (email: string) => {
  const waitlistRef = collection(db, "waitlist");

  // Check if the email already exists
  const q = query(waitlistRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    console.log("Email already exists on the waitlist:", email);
    alert("This email is already registered.");
    return;
  }

  // Add the email if it doesn't exist
  try {
    await addDoc(waitlistRef, {
      email: email,
      timestamp: Timestamp.now(),
    });
    console.log("Email added to waitlist:", email);
    alert("Thank you for registering! We’ll notify you when Reform launches.");
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    alert("An error occurred. Please try again later.");
  }
};
