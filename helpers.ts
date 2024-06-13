import {
  StripePaymentIntentRequestBody,
  StripePaymentIntentResponse,
} from "@/types";

export async function createPaymentIntentClientSecret({
  amount,
  currency,
}: StripePaymentIntentRequestBody): Promise<StripePaymentIntentResponse> {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_SERVICE_URL_DEV}/stripe-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      }
    );

    const { clientSecret, customer } = await response.json();

    if (!clientSecret || !customer) {
      const errorMessage = "Could not get clientSecret or customer from Stripe";

      throw new Error(errorMessage);
    }

    return { clientSecret, customer };
  } catch (error) {
    return {
      clientSecret: null,
      customer: null,
    };
  }
}
