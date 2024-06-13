import React from "react";

export const StripeProvider: React.FC<{
  publishableKey: string;
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  return <>{children}</>;
};
