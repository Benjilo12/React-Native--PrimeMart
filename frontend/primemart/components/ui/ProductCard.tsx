import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Product } from "@/type";
import AppColors from "@/constants/theme";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  customStyle?: StyleProp<ViewStyle>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compact,
  customStyle,
}) => {
  const { id, title, price, category, image } = product;
  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.compactCard, customStyle]}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text
          style={styles.title}
          numberOfLines={compact ? 1 : 2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppColors.background.primary,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
    width: "48%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppColors.gray[200],
  },
  compactCard: {
    width: 150,
    marginRight: 12,
  },
  imageContainer: {
    position: "relative",
    height: 150,
    backgroundColor: AppColors.background.primary,
    padding: 5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderColor: AppColors.warning,
  },
  content: {
    padding: 12,
    backgroundColor: AppColors.background.secondary,
  },
  category: {
    fontSize: 12,
    color: AppColors.primary[400],
    textTransform: "capitalize",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: AppColors.text.primary,
    marginBottom: 8,
  },
  footer: {
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: AppColors.primary[600],
  },
});
