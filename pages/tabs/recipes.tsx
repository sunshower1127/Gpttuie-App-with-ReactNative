import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import { Recipe } from "../../models/recipe";
import {
  saveRecipe,
  loadAllRecipes,
  deleteRecipe,
} from "../../components/saveRecipe";
import { useNavigation } from "@react-navigation/native";
import { MyNavigation } from "../../models/stackNav";
import UploadBtn from "../../components/uploadBtn";

const MyComponent = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<MyNavigation>();
  useEffect(() => {
    const fetchRecipes = async () => {
      const loadedRecipes = await loadAllRecipes();
      setRecipes(loadedRecipes);
    };
    fetchRecipes();
  }, []);

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

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      await saveRecipe(recipe);
      const loadedRecipes = await loadAllRecipes();
      setRecipes(loadedRecipes);
    } catch (error) {
      console.error("레시피 저장 중 에러 발생:", error);
    }
  };

  const handleOpenRecipe = (recipe: Recipe) => {
    navigation.push("레시피_프로세스", recipe);
  };

  return (
    <View>
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
          <View style={styles.buttonsContainer}>
            <View style={styles.reviewContainer}>
              <Text style={styles.oneLineReview}>{recipe.oneLineReview}</Text>
            </View>
            <Button
              icon="play"
              mode="elevated"
              style={styles.button}
              onPress={() => handleOpenRecipe(recipe)}
            >
              열기
            </Button>
            <Button
              mode="elevated"
              style={styles.button}
              onPress={() => handleDeleteRecipe(index)}
            >
              삭제
            </Button>
          </View>
          <View style={styles.uploadBtn}>
            <UploadBtn recipe={recipe} />
          </View>
          <Divider style={styles.divider} />
        </View>
      ))}
    </View>
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
    fontSize: 30,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    marginLeft: 10,
  },
  reviewContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  oneLineReview: {
    marginRight: 10,
    fontSize: 18,
  },
  divider: {
    marginTop: 10,
  },
  uploadBtn: {
    marginVertical: 5,
    marginLeft: "auto",
  },
});

export default MyComponent;
