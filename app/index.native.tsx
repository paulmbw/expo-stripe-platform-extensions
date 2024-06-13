import { Alert, Button, Image, StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@/providers/stripe/stripeFunctions";
import { createPaymentIntentClientSecret } from "@/helpers";
import { router } from "expo-router";

export default function HomeScreen() {
  async function pay() {
    const requestBody = {
      amount: 1000,
      currency: "usd",
    };

    const { customer, clientSecret } = await createPaymentIntentClientSecret(
      requestBody
    );

    if (!customer || !clientSecret) {
      return;
    }

    const paymentSheetConfig = {
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      paymentIntentClientSecret: clientSecret,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    };

    const { error: initPaymentSheetError } = await initPaymentSheet(
      paymentSheetConfig
    );

    if (initPaymentSheetError) {
      Alert.alert(
        "There was a problem processing the payment",
        "Please try again later"
      );

      return;
    }

    const { error: presentPaymentSheetError } = await presentPaymentSheet();

    if (presentPaymentSheetError) {
      Alert.alert(
        "There was a problem processing the payment",
        "Please try again later"
      );

      return;
    }

    router.navigate("/completion");
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Stripe on Native!</ThemedText>
        <HelloWave />
      </ThemedView>

      <Button onPress={pay} title="Pay" />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
