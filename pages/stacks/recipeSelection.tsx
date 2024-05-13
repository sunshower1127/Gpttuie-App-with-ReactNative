import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView, StatusBar } from "react-native";
import SimpleRecipeCard from "../../components/SimpleRecipeCard";

export default function RecipeSelection() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SimpleRecipeCard />
        <SimpleRecipeCard />
        <SimpleRecipeCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
  },
});
