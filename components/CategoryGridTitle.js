import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const CategoryGridTitle = ({ title, color, onPress }) => {
  return (
    <View style={[styles.gridItem, { backgroundColor: color }]}>
      <Pressable style={styles.button} onPress={onPress}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryGridTitle;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    width: 150,
    elevation: 4,
    borderRadius: 8,
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});