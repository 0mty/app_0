import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const MealItem = ({
  MealId,
  title,
  img,
  duration,
  complexity,
  affordability,
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate("MealDetail", { mealId: MealId, mealTitle: title });
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Image source={{ uri: img }} style={styles.ImageStyle} />
        <View style={styles.innercontainer}>
          <Text style={styles.TitleStyle}>{title}</Text>
          <View style={styles.desc}>
            <Text style={styles.textStyle}>{duration} mins</Text>
            <Text style={styles.textStyle}>{complexity}</Text>
            <Text style={styles.textStyle}>{affordability}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
  },
  ImageStyle: {
    width: "100%",
    height: 200,
  },
  innercontainer: {
    padding: 8,
  },
  TitleStyle: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    fontSize: 18,
  },
  desc: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "600",
  },
});
