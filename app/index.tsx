import { ThemedView } from "@/components/ThemedView";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Appearance, Stripe, loadStripe } from "@stripe/stripe-js";
import { useThemeColor } from "@/hooks/useThemeColor";
import { createPaymentIntentClientSecret } from "@/helpers";
import CheckoutForm from "@/components/CheckoutForm";

export default function Screen() {
  const [clientSecret, setClientSecret] = useState<string | null>();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  const backgroundColor = useThemeColor(
    { light: "white", dark: "black" },
    "background"
  );

  const publishablekey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishablekey) {
    throw new Error("Stripe publishable key is not set");
  }

  useEffect(() => {
    async function fetchClientSecret() {
      const requestBody = {
        amount: 1000, // Replace with the actual amount
        currency: "usd", // Replace with the actual currency
      };

      const { clientSecret } = await createPaymentIntentClientSecret(
        requestBody
      );

      setClientSecret(clientSecret);
      setStripePromise(loadStripe(publishablekey!));
    }

    fetchClientSecret();
  }, []);

  if (!clientSecret) {
    return (
      <ThemedView style={{ justifyContent: "center" }}>
        <ActivityIndicator />
      </ThemedView>
    );
  }

  const appearance = {
    theme: backgroundColor === "black" ? "night" : "stripe",
  } as Appearance;

  const layout = {
    type: "accordion",
    defaultCollapsed: false,
    radios: true,
    spacedAccordionItems: false,
  };

  const options = {
    appearance,
    layout,
  };

  return (
    <ThemedView>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, ...options }}>
          <ThemedView>
            <CheckoutForm />
          </ThemedView>
        </Elements>
      )}
    </ThemedView>
  );
}
