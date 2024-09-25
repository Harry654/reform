import { Timestamp } from "firebase/firestore";
import { TSubscription } from "./payment";

// Define the User type for Firestore
export type TFirestoreUser = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string | null;
  createdAt: Timestamp; // Use Firebase Timestamp for date fields
  tosAgreedAt: Timestamp;
  privacyPolicyAgreedAt: Timestamp;
  paystack_id: string | null;
  subscription: TSubscription;
};
