import {
  Alert,
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
import Button from "./Button";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import Rating from "./Rating";
import { useCartStore } from "@/store/cartStore";
import { useFavoritesStore } from "@/store/favouriteStore";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

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
  const { id, title, price, category, image, rating } = product;

  const router = useRouter();

  const { addItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(id);

  // Handle add to cart action
  const handleAddToCart = () => {
    // Implement add to cart functionality

    addItem(product, 1);
    Toast.show({
      type: "success",
      text1: "Added to Cart",
      text2: `${title} has been added to your cart.`,
      visibilityTime: 2000,
    });
  };

  // Implement navigation to product details
  const handleProductRoute = (e: any) => {
    // Implement navigation to product details
    router.push({ pathname: "/product/[id]", params: { id: product.id } });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    Toast.show({
      type: "success",
      text1: "Added to Favourite",
      text2: `${title} has been added to favourite.`,
      visibilityTime: 2000,
    });
  };

  return (
    <TouchableOpacity
      onPress={handleProductRoute}
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
      <TouchableOpacity
        onPress={handleToggleFavorite}
        style={[styles.favoriteButton, { borderWidth: isFav ? 1 : 0 }]}
      >
        <Feather
          name="heart"
          size={16}
          color={isFav ? AppColors.error : AppColors.gray[400]}
        />
      </TouchableOpacity>
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
          <View>
            <Text style={[styles.price, !compact && { marginBottom: 7 }]}>
              ${price.toFixed(2)}
            </Text>

            <View style={!compact && { marginBottom: 7 }}>
              <Rating size={12} rating={rating?.rate} count={rating?.count} />
            </View>

            {/* <Text style={[styles.ratingText, !compact && { marginBottom: 7 }]}>
              ratings:
              {rating?.rate.toFixed(1)}/{`(${rating?.count})`}
            </Text> */}
          </View>
          {!compact && (
            <Button
              onPress={handleAddToCart}
              title="Add to Cart"
              size="small"
              variant="outline"
            />
          )}
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
    borderColor: AppColors.error,
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
  ratingText: {
    textTransform: "capitalize",
    color: AppColors.gray[600],
    fontSize: 12,
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
