import { PaymentSheetConfig } from "@/types";
import {
  initPaymentSheet as nativeInitPaymentSheet,
  presentPaymentSheet as nativePresentPaymentSheet,
  PlatformPay,
  PlatformPayButton,
  confirmPlatformPayPayment,
  isPlatformPaySupported,
} from "@stripe/stripe-react-native";

export const initPaymentSheet = async (
  paymentSheetConfig: PaymentSheetConfig
) => {
  return await nativeInitPaymentSheet(paymentSheetConfig);
};

export const presentPaymentSheet = async () => {
  return await nativePresentPaymentSheet();
};

export {
  PlatformPay,
  PlatformPayButton,
  confirmPlatformPayPayment,
  isPlatformPaySupported,
};
