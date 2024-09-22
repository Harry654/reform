import { Timestamp } from "firebase/firestore";

// Define the User type for Firestore
export type TFirestoreUser = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  photoURL?: string;
  createdAt: Timestamp; // Use Firebase Timestamp for date fields
  subscriptionPlan: "free" | "basic" | "pro" | "enterprise" | null; // ID or name of the subscription plan
  subscriptionStartDate: Timestamp | null; // Start date of the subscription
  subscriptionStatus:
    | "not-started"
    | "active"
    | "non-renewing"
    | "attention"
    | "completed"
    | "cancelled"; // Status of the subscription
  lastPaymentDate: Timestamp | null; // Date of the last payment
  paymentMethod: string | null; // Payment method used
  tosAgreedAt: Timestamp;
  privacyPolicyAgreedAt: Timestamp;
  paystack_id?: string;
};
