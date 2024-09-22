export const updateCustomer = async (uid: string, customer_code: string) => {
  const customerData = { uid, customer_code };

  try {
    const response = await fetch("/api/paystack/update-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    const { data } = await response.json();

    if (response.ok) {
      console.log("Customer updated successfully:", data);
      return {
        data: { customer_code: data.customer_code },
        statusCode: 204,
        success: true,
      };
    } else {
      console.error("Error creating customer:", data);
      return { data: null, statusCode: 500, success: false };
    }
  } catch (error) {
    return { data: null, statusCode: 500, success: false };
  }
};
