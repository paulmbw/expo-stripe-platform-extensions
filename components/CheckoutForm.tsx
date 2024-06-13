import {
  PaymentElement,
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { ThemedText } from "./ThemedText";
import { Button, GestureResponderEvent, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> | GestureResponderEvent
  ) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form">
      <ThemedView style={styles.paymentContainer}>
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement
          id="payment-element"
          className="custom-payment-element"
        />

        {message && (
          <ThemedText style={styles.errorMessage}>{message}</ThemedText>
        )}

        <Button
          title="Pay"
          onPress={(event) => handleSubmit(event)}
          disabled={isLoading || !stripe || !elements}
        />
      </ThemedView>
    </form>
  );
}

const styles = StyleSheet.create({
  paymentContainer: {
    gap: 20,
    padding:50
  },
  errorMessage: {
    color: "#D81B3E",
  },
});
