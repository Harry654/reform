export const initiateAuthorizationCharge = async (
  email: string,
  amount: number,
  plan_code: string,
  start_date: string
) => {
  try {
    const subscriptionData = {
      email,
      amount,
      plan_code,
      start_date,
    };

    const response = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscriptionData),
    });

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
