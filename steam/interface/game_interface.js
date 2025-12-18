import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";

const { width: SCREEN_W } = Dimensions.get("window");

const formatPrice = (p) => {
  if (p == null) return null;
  if (typeof p === "number") return `$${p.toFixed(2)}`;
  return String(p);
};

const GameInterface = ({ route, navigation }) => {
  // prefer passed game object; fallback: try loading from gamedata by id
  const {
    game: routeGame,
    gameId,
    fromCategoryId,
    fromCategory,
  } = route.params ?? {};

  let game = routeGame ?? null;

  if (!game && gameId) {
    try {
      const mod = require("../data/gamedata.js");
      const GAMES = mod?.GAMES ?? mod?.default?.GAMES ?? [];
      game = Array.isArray(GAMES)
        ? GAMES.find((g) => g?.id === gameId) ?? null
        : null;
    } catch (e) {
      console.warn("failed to load GAMES for fallback:", e?.message ?? e);
    }
  }

  const title = game?.title ?? "Untitled";
  const imageUri =
    game?.GameImage ||
    game?.image ||
    game?.cover ||
    (typeof game === "string" && game.startsWith("http") ? game : null) ||
    null;

  const price = formatPrice(game?.price ?? game?.Price);

  return (
    <View style={styles.container}>
      {/* brighter header bar */}
      <View style={styles.headerBar}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() =>
              navigation.replace("Each", {
                categoryId: fromCategoryId,
                category: fromCategory,
              })
            }
            style={styles.backButton}
          >
            <Text style={styles.backText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bannerCard}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.bannerImage, styles.noImage]}>
              <Text style={styles.noImageText}>No image</Text>
            </View>
          )}

          <View style={styles.bannerOverlay} />
          <View style={styles.bannerTitleWrap}>
            <Text style={styles.bannerTitle} numberOfLines={2}>
              {title}
            </Text>
          </View>

          {price ? (
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{price}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.meta}>
          {game?.Developer ? (
            <Text style={styles.metaText}>Developer: {game.Developer}</Text>
          ) : null}
          {game?.Publisher ? (
            <Text style={styles.metaText}>Publisher: {game.Publisher}</Text>
          ) : null}
          {game?.Released ? (
            <Text style={styles.metaText}>Released: {game.Released}</Text>
          ) : null}
        </View>

        <View style={styles.descCard}>
          <Text style={styles.descTitle}>Description</Text>
          <Text style={styles.descText}>
            {game?.description ?? "No description available for this game."}
          </Text>
        </View>

        {/* BUY BUTTON - aligned right under description */}
        <View style={styles.buyRow}>
          <Pressable
            style={styles.buyButton}
            onPress={() => {
              // replace with real purchase/navigation logic
              console.log("Buy pressed for", game?.id ?? title);
            }}
          >
            <Text style={styles.buyButtonText}>{price ?? "FREE"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default GameInterface;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#071726" }, // dark blue body

  headerBar: {
    backgroundColor: "#12324a", // brighter header navy
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomColor: "#0f3146",
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerRow: {
    height: 56,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: { padding: 8, marginRight: 8 },
  backText: { color: "#e8f3ff", fontSize: 20 },
  headerTitle: { color: "#e8f3ff", fontSize: 18, fontWeight: "700", flex: 1 },

  scrollContent: { padding: 16, paddingBottom: 32 },

  bannerCard: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#0b2a3a",
    marginBottom: 12,
    width: "100%",
    alignSelf: "center",
  },
  bannerImage: {
    width: SCREEN_W - 32,
    height: 220,
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
  bannerTitleWrap: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitle: {
    color: "#e8f3ff",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
  },

  priceTag: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(6,30,45,0.7)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  priceText: { color: "#e8f3ff", fontWeight: "700", fontSize: 14 },

  meta: { marginTop: 8, marginBottom: 12 },
  metaText: { color: "#cfe7f7", fontSize: 13, marginBottom: 4 },

  descCard: {
    backgroundColor: "#0e2b3a",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  descTitle: {
    color: "#e8f3ff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  descText: { color: "#cfe7f7", fontSize: 14, lineHeight: 20 },

  // added buy button styles
  buyRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 18,
  },
  buyButton: {
    backgroundColor: "#27ae60", // green buy color
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
