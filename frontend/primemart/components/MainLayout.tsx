import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeHeader from "./ui/HomeHeader";
import AppColors from "@/constants/theme";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomeHeader />
      <View style={styles.container}>{children}</View>
    </>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: AppColors.background.primary,
  },
});
