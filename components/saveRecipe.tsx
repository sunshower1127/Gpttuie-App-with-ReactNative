import AsyncStorage from "@react-native-async-storage/async-storage";
import { Step, Recipe } from "../models/recipe";

// 단일 Recipe를 저장합니다.
export const saveRecipe = async (recipe: Recipe) => {
  try {
    const jsonValue = JSON.stringify(recipe);
    await AsyncStorage.setItem(`@recipe_${recipe.id}`, jsonValue);
    console.log("레시피 저장 완료");
  } catch (e) {
    // 저장 에러 처리
    console.error(e);
  }
};

// 특정 id의 Recipe를 불러옵니다.
export const loadRecipe = async (id: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@recipe_${id}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // 불러오기 에러 처리
    console.error(e);
  }
};

// 저장된 Recipe[]를 불러옵니다.
export const loadAllRecipes = async (): Promise<Recipe[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const recipeKeys = keys.filter((key) => key.startsWith("@recipe_"));
    const recipes: Recipe[] = await Promise.all(
      recipeKeys.map(async (key) => {
        const recipe = await loadRecipe(key.replace("@recipe_", ""));
        return recipe;
      })
    );
    return recipes;
  } catch (e) {
    console.error(e);
    return [];
  }
};

// 특정 id의 레시피를 삭제합니다.
export const deleteRecipe = async (id: string) => {
  try {
    await AsyncStorage.removeItem(`@recipe_${id}`);
  } catch (e) {
    // 삭제 에러 처리
    console.error(e);
  }
};
