// This file exists to address the following error when running the web app:

// Unable to resolve "../../Utilities/Platform" from "node_modules/react-native/Libraries/Components/TextInput/TextInputState.js"
// None of these files exist:
//   * node_modules/react-native/Libraries/Utilities/Platform...
//   * node_modules/react-native/Libraries/Utilities/Platform/index..

// You can read more in the Expo Docs: https://docs.expo.dev/router/advanced/platform-specific-modules/

import { PaymentSheetConfig } from "@/types";

export const initPaymentSheet = async (
  paymentSheetConfig: PaymentSheetConfig
) => {
  return { error: null };
};

export const presentPaymentSheet = async () => {
  return { error: null };
};
