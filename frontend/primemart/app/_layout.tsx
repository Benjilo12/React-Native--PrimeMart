import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import "react-native-reanimated";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar, View } from "react-native";
import AppColors from "@/constants/theme";

const LIGHT_ORANGE = AppColors.accent[400];

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const publishableKey =
    "pk_test_51T7sGgEbEGsDjCtTVtx7Z6dNYutB4ABAmY284iphyDAnxefrqQ3dLrsLOIvTttLsGfwZzfsT7YyI1z7Ko525o6Fj00ORhBOjB5";
  return (
    <>
      <StatusBar
        backgroundColor={LIGHT_ORANGE}
        barStyle="light-content"
        translucent={false}
        animated={true}
      />
      <StripeProvider publishableKey={publishableKey}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <Toast />
      </StripeProvider>
    </>
  );
}
