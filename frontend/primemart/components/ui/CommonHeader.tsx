import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AppColors from "@/constants/theme";
import {
  AntDesign,
  Feather,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Props {
  isFav?: boolean;
  handleToggleFavorite?: () => void;
}

const CommonHeader = ({ isFav, handleToggleFavorite }: Props) => {
  const router = useRouter();

  // Handle go back action
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Feather name="arrow-left" size={20} color={AppColors.text.primary} />
      </TouchableOpacity>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[styles.favoriteButton, isFav && styles.activeFavoriteButton]}
        >
          <Feather
            name="heart"
            size={20}
            color={
              isFav ? AppColors.background.primary : AppColors.text.primary
            }
            fill={isFav ? AppColors.background.primary : "none"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.favoriteButton]}
          onPress={() => router.push("/(tabs)/Cart")}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={20}
            color={AppColors.text.primary}
            fill={isFav ? AppColors.background.primary : "transparent"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    zIndex: 10,
    marginTop: Platform.OS === "android" ? 35 : 0,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AppColors.background.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  activeFavoriteButton: {
    backgroundColor: AppColors.error,
  },
  buttonView: {
    flexDirection: "row",
    gap: 5,
  },
});
