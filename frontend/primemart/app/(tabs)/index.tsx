import HomeHeader from "@/components/ui/HomeHeader";
import AppColors from "@/constants/theme";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  return (
    <View style={styles.wrapper}>
      <HomeHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppColors.background.primary,
    flex: 1,
  },
});
