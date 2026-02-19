import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Logo = () => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.logoView} onPress={() => router.push("/")}>
      <MaterialIcons name="shopping-cart" size={20} color="pink" />
      <Text style={styles.logoText}>PrimeMart</Text>
    </TouchableOpacity>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoView: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontFamily: "Inter-Bold",
    fontSize: 20,

    marginLeft: 2,
  },
});
