import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppColors from "@/constants/theme";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Banner() {
  const router = useRouter();
  const handleShopNow = () => {
    router.push("/(tabs)/shop");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/banner.jpg")} // Add your banner image
        style={styles.bannerImage}
        resizeMode="cover"
      />
      {/* Optional: Overlay content */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Special Offer</Text>
        <Text style={styles.subtitle}>Up to 50% off on selected items</Text>
        <TouchableOpacity style={styles.button} onPress={handleShopNow}>
          <Text style={styles.buttonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 40, // Account for padding
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "white",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: "white",
    marginBottom: 16,
  },
  button: {
    backgroundColor: AppColors.accent[400],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: "white",
  },
});
