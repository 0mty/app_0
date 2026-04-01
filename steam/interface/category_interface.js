import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { fetchCategories } from "../utils/firestoreUtils.js";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const CategoryCard = ({ item, onPress }) => {
  const pressAnim = useRef(new Animated.Value(0)).current;
  const hoverAnim = useRef(new Animated.Value(0)).current;

  const pressScale = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.98],
  });
  const hoverScale = hoverAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.06],
  });
  const imageScale = Animated.multiply(pressScale, hoverScale);
  const overlay = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.18, 0.36],
  });

  const animatePress = (toValue) =>
    Animated.timing(pressAnim, {
      toValue,
      duration: toValue ? 120 : 180,
      useNativeDriver: true,
    }).start();
  const animateHover = (toValue) =>
    Animated.timing(hoverAnim, {
      toValue,
      duration: 150,
      useNativeDriver: true,
    }).start();

  const handlePressIn = () => animatePress(1);
  const handlePressOut = () => animatePress(0);
  const handleHoverIn = () => animateHover(1);
  const handleHoverOut = () => animateHover(0);

  const title = item?.name ?? item?.title ?? "Untitled";
  const findFirstUrl = (val, seen = new Set()) => {
    if (!val || seen.has(val)) return null;
    if (typeof val === "string" && val.startsWith("http")) return val;
    if (typeof val === "object") {
      seen.add(val);
      for (const k of Object.keys(val)) {
        try {
          const res = findFirstUrl(val[k], seen);
          if (res) return res;
        } catch (e) {}
      }
    }
    return null;
  };
  const imageUri =
    (item &&
      (item.imageUrl ||
        item.cover ||
        item.image ||
        item.GameImage ||
        item.src ||
        item.url ||
        item.thumbnail ||
        item.coverImage ||
        findFirstUrl(item))) ||
    null;

  const [imgError, setImgError] = React.useState(false);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        handlePressOut();
        setTimeout(() => onPress(item), 120);
      }}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      android_ripple={null}
      style={{ marginBottom: 12 }}
    >
      <Animated.View style={styles.card}>
        {imageUri && !imgError ? (
          <AnimatedImage
            source={{ uri: imageUri }}
            style={[styles.cover, { transform: [{ scale: imageScale }] }]}
            resizeMode="cover"
            onError={(e) => {
              console.warn("Image load failed:", imageUri, e.nativeEvent ?? e);
              setImgError(true);
            }}
          />
        ) : (
          <View style={[styles.cover, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        <Animated.View
          pointerEvents="none"
          style={[
            styles.overlay,
            { backgroundColor: "rgba(0,0,0,1)", opacity: overlay },
          ]}
        />

        <View style={styles.titleWrap} pointerEvents="none">
          <Text style={styles.title}>{title}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const CategoryInterface = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const data = await fetchCategories();
      setCategories(data);
      setLoading(false);
    };
    loadCategories();
  }, []);

  const openCategory = (category) => {
    navigation.replace("Each", { categoryId: category?.id, category });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.header}>Categories</Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <Text style={styles.info}>Loading categories...</Text>
        </View>
      ) : categories.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.info}>No categories to display</Text>
        </View>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item, idx) => item?.id?.toString?.() ?? String(idx)}
          renderItem={({ item }) => (
            <CategoryCard item={item} onPress={openCategory} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default CategoryInterface;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#071726" },

  headerBar: {
    backgroundColor: "#12324a",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  header: { color: "#e8f3ff", fontSize: 20, fontWeight: "700" },
  list: { paddingBottom: 24 },

  card: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#0b2a3a",
    elevation: 3,
  },
  cover: { width: "100%", height: 140, backgroundColor: "#082033" },
  placeholder: { alignItems: "center", justifyContent: "center" },
  placeholderText: { color: "#9fb7c9" },

  overlay: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  titleWrap: {
    position: "absolute",
    left: 12,
    right: 12,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  title: {
    color: "#e8f3ff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  info: { color: "#9fb7c9" },
});
