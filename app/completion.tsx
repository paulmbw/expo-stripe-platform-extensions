import { Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";

export default function Screen() {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text>Payment successful! 🎉</Text>
    </ThemedView>
  );
}
