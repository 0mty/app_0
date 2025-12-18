import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { MEALS } from "./data/Mealdata";

const MealDetail = ({ route }) => {
  const mealId = route?.params?.mealId;
  const meal = MEALS.find((m) => m.id === mealId);

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "white" }}>Meal not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.imageUrl }} style={styles.ImageStyle} />
      <View style={styles.innercontainer}>
        <Text style={styles.TitleStyle}>{meal.title}</Text>
        <View style={styles.desc}>
          <Text style={styles.textStyle}>{meal.duration} mins</Text>
          <Text style={styles.textStyle}>{meal.complexity}</Text>
          <Text style={styles.textStyle}>{meal.affordability}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {meal.ingredients.map((ing, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text>{ing}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Steps</Text>
          {meal.steps.map((step, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text>
                {idx + 1}. {step}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#351401",
  },
  ImageStyle: {
    width: "100%",
    height: 220,
  },
  innercontainer: {
    padding: 12,
  },
  TitleStyle: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 20,
    color: "white",
  },
  desc: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  listItem: {
    backgroundColor: "white",
    padding: 8,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
