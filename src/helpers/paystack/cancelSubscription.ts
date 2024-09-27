export const cancelSubscription = async (code: string, token: string) => {
  if (!code || !token) return;

  try {
    const response = await fetch("/api/paystack/cancel-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        token,
      }),
    });

    await response.json();

    if (response.ok) {
      return {
        statusCode: 201,
        success: true,
      };
    } else {
      return { statusCode: 500, success: false };
    }
  } catch (error) {
    return { statusCode: 500, success: false };
  }
};
