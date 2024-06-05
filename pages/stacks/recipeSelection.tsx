import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import RecipeSelectionCard from "../../components/recipeSelectionCard";
import { Recipe } from "../../models/recipe";
import { StackRouteProp } from "../../models/stackNav";
import { getRecipeCandidates } from "../../utils/gpt";
import { MyNavigation } from "../../models/stackNav";

// 유저의 레시피 세팅에 따라서 GPT에게 레시피 후보를 물어보는 페이지
// 레시피 후보를 3개 받아와서 보여줌.
// 유저가 그중 하나를 선택하면 RecipeCreation 페이지로 이동함
export default function RecipeSelection() {
  const navigation = useNavigation<MyNavigation>();
  const route = useRoute<RouteProp<StackRouteProp, "레시피_선택">>();
  const [recipeCandidates, setRecipeCandidates] = useState<Recipe[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const recipeSetting = route.params;
    if (!recipeSetting) {
      alert("에러 : 레시피 설정이 없습니다.");
      return;
    }

    const getCandidates = async () => {
      if (!recipeSetting.title) {
        const candidates = await getRecipeCandidates(recipeSetting);
        if (candidates) setRecipeCandidates(candidates);
        console.log("RecipeSelection -->");
        console.log("Recipes: ", candidates);
        console.log("<-- RecipeSelection");
        setIsLoading(false);
      } else {
        const candidate = await recipeSetting;
        if (candidate) setRecipeCandidates([candidate]);
        console.log("RecipeSelection -->");
        console.log("Recipes: ", candidate);
        console.log("<-- RecipeSelection");
        setIsLoading(false);
        navigation.push("레시피_생성", recipeSetting);
      }
    };

    getCandidates();
  }, []);

  return isLoading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator animating={true} size="large" />
      <Text>AI에게 물어보는중...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      {recipeCandidates?.map((recipe, index) => (
        <RecipeSelectionCard key={index} recipe={recipe} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    gap: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
