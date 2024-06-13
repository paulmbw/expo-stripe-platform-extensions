import { PaymentSheetConfig } from "@/types";
import {
  initPaymentSheet as nativeInitPaymentSheet,
  presentPaymentSheet as nativePresentPaymentSheet,
} from "@stripe/stripe-react-native";

export const initPaymentSheet = async (
  paymentSheetConfig: PaymentSheetConfig
) => {
  return await nativeInitPaymentSheet(paymentSheetConfig);
};

export const presentPaymentSheet = async () => {
  return await nativePresentPaymentSheet();
};
