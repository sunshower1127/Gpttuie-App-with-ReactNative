import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
//////////////////////////////
export interface Step {
  description?: string | null;
  image?: string | null;
  timer?: string | null;
}

export interface Recipe {
  title?: string | null;
  servingSize?: number | null;
  country?: string | null;
  ingredients?: string[] | null;
  steps?: Step[] | null;
  rating?: number | null;
  oneLineReview: string | null;
}

const recipes: Recipe[] = [
  {
    title: "치즈토스트",
    servingSize: 2,
    country: "한국",
    ingredients: ["식빵", "체다치즈", "계란"],
    steps: [
      { description: "1. 식빵을 준비합니다." },
      { description: "2. 체다치즈를 올립니다.", timer: "00:05" },
      { description: "3. 계란물을 끼얹습니다." },
    ],
    rating: 4.5,
    oneLineReview: "맛있어요",
  },
  {
    title: "스테이크",
    servingSize: 4,
    country: "미국",
    ingredients: ["안심스테이크", "버터", "소금", "후추"],
    steps: [
      { description: "1. 스테이크를 준비합니다." },
      { description: "2. 팬에 버터를 녹입니다.", timer: "00:03" },
      { description: "3. 스테이크를 구웁니다.", timer: "00:10" },
    ],
    rating: 4.8,
    oneLineReview: "맛있어요",
  },
  // 추가적인 레시피 데이터
];
///////////////////

const MyComponent = () => (
  <View>
    {recipes.map((recipe, index) => (
      <View key={index} style={styles.recipeContainer}>
        <View style={styles.header}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.rightSection}>
            <Avatar.Icon
              size={40}
              icon={
                recipe.country === "한국"
                  ? "rice"
                  : recipe.country === "중국"
                  ? "food-takeout-box"
                  : recipe.country === "일본"
                  ? "noodles"
                  : recipe.country === "미국" ||
                    recipe.country === "이탈리아" ||
                    recipe.country === "멕시코"
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
          <Button icon="play" mode="elevated" style={styles.button}>
            열기
          </Button>
          <Button mode="elevated" style={styles.button}>
            삭제
          </Button>
        </View>
        <Divider style={styles.divider} />
      </View>
    ))}
  </View>
);

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
});

export default MyComponent;
