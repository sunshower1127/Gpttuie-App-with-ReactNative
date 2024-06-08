import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import { deleteRecipe, loadAllRecipes } from "../../components/saveRecipe";
import UploadBtn from "../../components/uploadBtn";
import { Recipe } from "../../models/recipe";
import { MyNavigation } from "../../models/stackNav";

const MyComponent = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<MyNavigation>();
  const fetchRecipes = async () => {
    const loadedRecipes = await loadAllRecipes();
    setRecipes(loadedRecipes);
  };

  fetchRecipes();

  const handleDeleteRecipe = async (index: number) => {
    try {
      const recipeToDelete = recipes[index];
      await deleteRecipe(recipeToDelete.id || "");
      const updatedRecipes = recipes.filter((_, i) => i !== index);
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("레시피 삭제 중 에러 발생:", error);
    }
  };

  const handleOpenRecipe = (recipe: Recipe) => {
    navigation.push("레시피_프로세스", recipe);
  };

  return (
    <ScrollView>
      {recipes.length === 0 && (
        <Text style={styles.error}>저장된 레시피가 없습니다.</Text>
      )}
      {recipes.map((recipe, index) => (
        <View key={index} style={styles.recipeContainer}>
          <View style={styles.header}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <View style={styles.rightSection}>
              <Avatar.Icon
                size={40}
                icon={
                  recipe.country === "한식"
                    ? "rice"
                    : recipe.country === "중식"
                    ? "food-takeout-box"
                    : recipe.country === "일식"
                    ? "noodles"
                    : recipe.country === "양식"
                    ? "hamburger"
                    : "food"
                }
                style={styles.icon}
              />
              <Button icon="star" style={styles.button}>
                {recipe.rating}
              </Button>
            </View>
          </View>
          <View style={styles.bottomcontainer}>
            <View style={styles.reviewContainer}>
              <Text style={styles.oneLineReview}>{recipe.oneLineReview}</Text>
            </View>
            <View style={styles.buttoncontainer}>
              <Button
                icon="play"
                mode="elevated"
                style={styles.button}
                onPress={() => handleOpenRecipe(recipe)}
              >
                열기
              </Button>
              <UploadBtn recipe={recipe} />
              <Button
                mode="elevated"
                style={styles.button}
                onPress={() => handleDeleteRecipe(index)}
              >
                삭제
              </Button>
            </View>
          </View>
          <Divider style={styles.divider} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recipeContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginHorizontal: 10,
  },
  recipeTitle: {
    fontSize: 24,
    marginLeft: 10,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  reviewContainer: {
    marginHorizontal: 10,
    padding: 10,
  },
  bottomcontainer: {
    justifyContent: "flex-end",
    marginTop: 10,
  },
  oneLineReview: {
    marginRight: 10,
    fontSize: 16,
    color: "gray",
  },
  divider: {
    marginTop: 10,
  },

  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },

  error: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
});

export default MyComponent;
