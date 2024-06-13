import React from "react";
import { StripeProvider as CustomStripeProvider } from "./stripe/stripe";

type StripeProviderProps = {
  children: JSX.Element | JSX.Element[];
};

const StripeProvider: React.FC<StripeProviderProps> = ({
  children,
}: StripeProviderProps): JSX.Element => {
  const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const merchantIdentifier = process.env.EXPO_PUBLIC_STRIPE_MERCHANT_IDENTIFIER;

  if (!publishableKey) {
    throw new Error(
      "publishableKey is not set. Ensure that EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY is set in your environment variables."
    );
  }

  return (
    <CustomStripeProvider
      merchantIdentifier={merchantIdentifier}
      publishableKey={publishableKey}
    >
      {children}
    </CustomStripeProvider>
  );
};

export default StripeProvider;
