import AsyncStorage from "@react-native-async-storage/async-storage";
import { Step, Recipe } from "../models/recipe";

// Recipe[]를 저장합니다.
const saveRecipes = async (recipes: Recipe[]) => {
  try {
    const jsonValue = JSON.stringify(recipes);
    await AsyncStorage.setItem("@recipes", jsonValue);
  } catch (e) {
    // 저장 에러 처리
    console.error(e);
  }
};

// 저장된 Recipe[]를 불러옵니다.
const loadRecipes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@recipes");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // 불러오기 에러 처리
    console.error(e);
  }
};
