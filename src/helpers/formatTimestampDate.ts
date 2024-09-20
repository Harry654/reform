import { Timestamp } from "firebase/firestore";

// Example of formatting a Firestore Timestamp to a readable date
export const formatTimestampDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
  return date.toLocaleDateString(); // Format the date to a localized string
};
