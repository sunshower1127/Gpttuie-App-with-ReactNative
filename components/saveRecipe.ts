import AsyncStorage from "@react-native-async-storage/async-storage";
import { Step, Recipe } from "../models/recipe";

// Recipe[]를 저장합니다.
export const saveRecipes = async (recipes: Recipe[]) => {
  try {
    const jsonValue = JSON.stringify(recipes);
    await AsyncStorage.setItem("@recipes", jsonValue);
    console.log("레시피 저장 완료");
  } catch (e) {
    // 저장 에러 처리
    console.error(e);
  }
};

// 저장된 Recipe[]를 불러옵니다.
export const loadRecipes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@recipes");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // 불러오기 에러 처리
    console.error(e);
  }
};

export const deleteRecipe = async (index: number) => {
  try {
    // 저장된 레시피를 불러옵니다.
    const recipes = await loadRecipes();

    if (recipes) {
      // 특정 인덱스의 레시피를 삭제합니다.
      recipes.splice(index, 1);

      // 결과를 다시 저장합니다.
      await saveRecipes(recipes);
    }
  } catch (e) {
    // 삭제 에러 처리
    console.error(e);
  }
};
