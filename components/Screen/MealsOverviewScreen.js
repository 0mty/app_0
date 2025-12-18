import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MEALS } from "../data/Mealdata";
import MealItem from "../MealItem";

const MealsOverviewScreen = ({ route, navigation }) => {
  const catId = route.params.categoryId;
  const displayMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        MealId={itemData.item.id}
        title={itemData.item.title}
        img={itemData.item.imageUrl}
        ingredients={itemData.item.ingredients}
        steps={itemData.item.steps}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        isGlutenFree={itemData.item.isGlutenFree}
        isVegan={itemData.item.isVegan}
        isVegetarian={itemData.item.isVegetarian}
        isLactoseFree={itemData.item.isLactoseFree}
        navigation={navigation}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={displayMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#351401",
  },
});
