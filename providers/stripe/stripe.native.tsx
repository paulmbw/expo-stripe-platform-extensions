import * as Stripe from "@stripe/stripe-react-native";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

export const StripeProvider: React.FC<{
  publishableKey: string;
  merchantIdentifier: string;
  children: JSX.Element | JSX.Element[];
}> = ({ publishableKey, merchantIdentifier, children }) => {
  return (
    <Stripe.StripeProvider
      merchantIdentifier={merchantIdentifier}
      publishableKey={publishableKey}
    >
      {children}
    </Stripe.StripeProvider>
  );
};

export { initPaymentSheet, presentPaymentSheet };
