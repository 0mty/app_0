import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import {
  fetchCategories,
  fetchGamesByCategory,
} from "../utils/firestoreUtils.js";

const AnimatedImage = Animated.createAnimatedComponent(Image);

// Banner-style game item (big image with centered title overlay, price badge and hover/press)
const GameItem = ({ game, navigation, fromCategory }) => {
  const title = game?.title ?? "Untitled";
  const imageUri =
    game?.imageUrl ||
    game?.GameImage ||
    game?.image ||
    game?.GameImg ||
    game?.cover ||
    findFirstUrl(game) ||
    null;

  const priceRaw = game?.price ?? game?.Price ?? null;
  const price =
    priceRaw == null
      ? null
      : typeof priceRaw === "number"
      ? `$${priceRaw.toFixed(2)}`
      : String(priceRaw);

  // animations
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

  const [imgError, setImgError] = useState(false);

  const openGame = () => {
    // keep press visual briefly then navigate (replace to mimic page refresh)
    handlePressOut();
    setTimeout(() => {
      navigation.replace("Game", {
        gameId: game?.id,
        game,
        fromCategoryId: fromCategory?.id,
        fromCategory,
      });
    }, 120);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={openGame}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      android_ripple={null}
      style={{ marginBottom: 12 }}
    >
      <View style={styles.bannerCard}>
        {imageUri && !imgError ? (
          <AnimatedImage
            source={{ uri: imageUri }}
            style={[styles.bannerImage, { transform: [{ scale: imageScale }] }]}
            resizeMode="cover"
            onError={(e) => {
              console.warn("Image load failed:", imageUri, e.nativeEvent ?? e);
              setImgError(true);
            }}
          />
        ) : (
          <View style={[styles.bannerImage, styles.gamePlaceholder]}>
            <Text style={{ color: "#888" }}>No image</Text>
          </View>
        )}

        <Animated.View
          pointerEvents="none"
          style={[styles.bannerOverlay, { opacity: overlay }]}
        />

        {/* price badge top-right */}
        {price ? (
          <View style={styles.priceTag} pointerEvents="none">
            <Text style={styles.priceText}>{price}</Text>
          </View>
        ) : null}

        <View style={styles.bannerTitleWrap} pointerEvents="none">
          <Text numberOfLines={2} style={styles.bannerTitle}>
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const EachInterface = ({ route, navigation }) => {
  const { categoryId, category } = route.params ?? {};
  const [categoryObj, setCategoryObj] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const categories = await fetchCategories();
        const categoryData = category ??
          categories.find((c) => c?.id === categoryId) ?? {
            id: categoryId,
            title: "Category",
          };
        setCategoryObj(categoryData);

        const games = await fetchGamesByCategory(categoryData.id);
        setFilteredGames(games);
      } catch (error) {
        console.error("Error loading category data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [categoryId, category]);

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => navigation.replace("Categories")}
            style={styles.backButton}
          >
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <Text style={styles.header}>{categoryObj?.title ?? "Category"}</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <Text style={{ color: "#ddd" }}>Loading games...</Text>
        </View>
      ) : filteredGames.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ color: "#ddd" }}>No games for this category</Text>
        </View>
      ) : (
        <FlatList
          data={filteredGames}
          keyExtractor={(item, idx) => item?.id?.toString?.() ?? String(idx)}
          renderItem={({ item }) => (
            <GameItem
              game={item}
              navigation={navigation}
              fromCategory={categoryObj}
            />
          )}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 8 }}
        />
      )}
    </View>
  );
};

export default EachInterface;

// add/modify styles for banner items
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071726", padding: 16 }, // dark blue body

  // brighter header area
  headerBar: {
    backgroundColor: "#12324a",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  backButton: { padding: 6, marginRight: 8 },
  backText: { color: "#e8f3ff", fontSize: 20 },
  header: { color: "#e8f3ff", fontSize: 20, fontWeight: "700" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },

  // banner card
  bannerCard: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#0b2a3a",
    elevation: 3,
  },
  bannerImage: {
    width: "100%",
    height: 180,
    backgroundColor: "#082033",
  },
  bannerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(2,8,15,0.32)",
  },
  priceTag: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(6,30,45,0.7)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  priceText: {
    color: "#e8f3ff",
    fontWeight: "700",
    fontSize: 13,
  },

  bannerTitleWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  bannerTitle: {
    color: "#e8f3ff",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },

  gamePlaceholder: { alignItems: "center", justifyContent: "center" },
  gameTitle: { color: "#e8f3ff", fontSize: 16, fontWeight: "600" },
  gameSub: { color: "#9fb7c9", fontSize: 12, marginTop: 4 },
});
