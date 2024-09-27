export const fetchSubscription = async (code: string) => {
  if (!code || code === "free") return;

  try {
    const response = await fetch("/api/paystack/fetch-subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
      }),
    });

    const { data } = await response.json();

    if (response.ok) {
      return {
        statusCode: 201,
        success: true,
        data,
      };
    } else {
      return { statusCode: 500, success: false };
    }
  } catch (error) {
    return { statusCode: 500, success: false };
  }
};
