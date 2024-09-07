import axios from "axios";
export const addToBrevo = async (email: string) => {
  try {
    await axios.get(
      `https://email-api-coral.vercel.app/home/save-email?email=${encodeURIComponent(email)}`
    );
  } catch (error) {
  } finally {
    return true;
  }
};
