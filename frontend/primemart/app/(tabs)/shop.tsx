import {
  FlatList,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppColors from "@/constants/theme";
import Wrapper from "@/components/ui/Wrapper";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProductsStore } from "@/store/productStore";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import EmptyState from "@/components/ui/EmptyState";
import ProductCard from "@/components/ui/ProductCard";

const ShopScreen = () => {
  const { category: categoryParam } = useLocalSearchParams<{
    category?: string;
  }>();

  const {
    filteredProducts,
    selectedCategory,
    loading,
    error,
    fetchProducts,
    setCategory,
    sortProducts,
    fetchCategories,
    categories,
    products,
  } = useProductsStore();

  const router = useRouter();
  const [showSortModal, setShowSortModal] = useState(false);
  const [activeSortOption, setActiveSortOption] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);

  // FIX 1: Add dependency array to prevent infinite loop
  useEffect(() => {
    fetchCategories();
    fetchProducts();
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, []); // Add empty array - only run once on mount

  // useEffect(() => {
  //   setIsFilterActive(selectedCategory !== null || activeSortOption !== null);
  // }, []);

  // FIX 2: Handle category changes separately
  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>All Products</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.searchRow}
            onPress={() => router.push("/(tabs)/Search")}
          >
            <View style={styles.searchContainer}>
              <View style={styles.searchInput}>
                <Text style={styles.searchPlaceholder}>
                  Search products....
                </Text>
              </View>
            </View>
            <View style={styles.searchButton}>
              <AntDesign name="search" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortOptionView,
              isFilterActive && styles.activeSortButton,
            ]}
            onPress={() => setShowSortModal(true)} // Add handler
          >
            <AntDesign name="filter" size={20} color={AppColors.text.primary} />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {/* FIX 3: Add onPress handler for "All" button */}
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === null && styles.selectedCategory,
            ]}
            onPress={() => setCategory(null)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === null && styles.selectedCategoryText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {/* FIX 4: Add onPress handlers for category buttons */}
          {categories?.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory, // Fix comparison
              ]}
              onPress={() => setCategory(category)} // Add handler
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText, // Fix comparison and style
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };
  if (loading && filteredProducts?.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <LoadingSpinner fullScreen />
      </View>
    );
  }
  if (error) {
    return (
      <Wrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </Wrapper>
    );
  }

  const handleSort = (sortBy: "price-asc" | "price-desc" | "rating-desc") => {
    sortProducts(sortBy);
    setActiveSortOption(sortBy);
    setShowSortModal(false);
    setIsFilterActive(true);
  };

  const handleResetFilter = () => {
    sortProducts("price-asc");
    setActiveSortOption(null);
    setShowSortModal(false);
    setIsFilterActive(false);
  };
  return (
    <Wrapper>
      {renderHeader()}
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LoadingSpinner fullScreen />
        </View>
      ) : filteredProducts?.length === 0 ? (
        <EmptyState type="cart" message="No products matching your criteria" />
      ) : (
        <FlatList
          data={filteredProducts || products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <ProductCard product={item} customStyle={{ width: "100%" }} />
            </View>
          )}
          contentContainerStyle={styles.productsGrid}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<View style={styles.footer} />}
        />
      )}
      <Modal
        visible={showSortModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSortModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sort By</Text>
              <TouchableOpacity onPress={() => setShowSortModal(false)}>
                <AntDesign
                  name="close"
                  size={24}
                  color={AppColors.text.primary}
                  onPress={() => setShowSortModal(false)}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                ,
                activeSortOption === "price-asc" && styles.activeSortOption,
              ]}
              onPress={() => handleSort("price-asc")}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  activeSortOption === "price-asc" && styles.activeSortText,
                ]}
              >
                Price: Low to High
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                ,
                activeSortOption === "price-desc" && styles.activeSortOption,
              ]}
              onPress={() => handleSort("price-desc")}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  activeSortOption === "rating" && styles.activeSortText,
                ]}
              >
                Price: High to Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                ,
                activeSortOption === "rating" && styles.activeSortOption,
              ]}
              onPress={() => handleSort("rating-desc")}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  activeSortOption === "rating" && styles.activeSortText,
                ]}
              >
                Highest Rated
              </Text>
            </TouchableOpacity>
            {isFilterActive && (
              <TouchableOpacity
                style={styles.sortOption}
                onPress={handleResetFilter}
              >
                <Text
                  style={[styles.sortOptionText, { color: AppColors.error }]}
                >
                  Reset
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </Wrapper>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.OS === "android" ? 10 : 0,
    paddingBottom: 16,
    backgroundColor: AppColors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: AppColors.gray[200],
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: AppColors.text.primary,
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    position: "relative",
    flex: 1,
    marginRight: 5,
  },
  searchContainer: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: AppColors.gray[300],
  },
  searchPlaceholder: {
    fontSize: 16,
    color: AppColors.text.secondary,
  },
  searchInputStyle: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    borderColor: "transparent",
  },
  searchButton: {
    backgroundColor: AppColors.accent[500],
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    position: "absolute",
    right: 0,
  },
  sortButton: {
    backgroundColor: AppColors.background.secondary,
    borderRadius: 8,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  activeSortButton: {
    borderWidth: 1,
    borderColor: AppColors.error,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: AppColors.background.secondary,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: AppColors.accent[400],
  },
  categoryText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: AppColors.text.primary,
  },
  selectedCategoryText: {
    color: AppColors.background.primary,
  },
  productsGrid: {
    paddingHorizontal: 5,
    paddingTop: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  productContainer: {
    width: "48%",
  },
  footer: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: AppColors.background.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 18,
    color: AppColors.text.primary,
  },
  sortOption: {
    borderWidth: 1,
    borderColor: AppColors.gray[200],
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sortOptionView: {
    borderWidth: 1,
    borderColor: AppColors.gray[200],
    width: 45,
    height: 45,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeSortOption: {
    backgroundColor: AppColors.background.secondary,
  },
  activeSortText: {
    color: AppColors.primary[600],

    fontWeight: "bold",
  },
  sortOptionText: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: AppColors.text.primary,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    color: AppColors.error,
    textAlign: "center",
  },
});
