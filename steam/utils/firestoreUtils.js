import { collection, getDocs } from "firebase/firestore";
import { db } from "../scripts/firebaseConfig.js";

export const fetchCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchGames = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "games"));
    const games = [];
    querySnapshot.forEach((doc) => {
      games.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};

export const fetchGamesByCategory = async (categoryId) => {
  try {
    const allGames = await fetchGames();
    return allGames.filter((game) => game.categoryIds?.includes(categoryId));
  } catch (error) {
    console.error("Error fetching games by category:", error);
    return [];
  }
};

export const fetchGameById = async (gameId) => {
  try {
    const allGames = await fetchGames();
    return allGames.find((game) => game.id === gameId);
  } catch (error) {
    console.error("Error fetching game by id:", error);
    return null;
  }
};
