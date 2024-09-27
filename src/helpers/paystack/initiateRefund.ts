export const initiateRefund = async (transaction: string) => {
  try {
    const response = await fetch("/api/paystack/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transaction }),
    });

    const { data } = await response.json();
    console.log(data);
  } catch (error) {
    return { data: null, statusCode: 500, success: false };
  }
};