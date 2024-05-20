import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList, RootStackNavigationProp } from '../../navigations/stackNavigation';
import choiceRecipe from '../../choiceRecipe';


type RecipeSelectionRouteProp = RouteProp<RootStackParamList, '레시피 선택'>;  //재료, 종류, 인원 수
type RecipeCreationRouteProp = RouteProp<RootStackParamList, '레시피 생성'>;   // 레시피 이름

const RecipeSelection = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const routeSelection = useRoute<RecipeSelectionRouteProp>();
  const routeCreation = useRoute<RecipeCreationRouteProp>();

  // 레시피 선택 파라미터
  const [servings, setServings] = useState(routeSelection.params?.servingSize);
  console.log("recipeSelection", servings);
  const [ingredients, setIngredients] = useState(routeSelection.params?.ingredients);
  console.log("recipeSelection", ingredients);
  const [country, setCountry] = useState(routeSelection.params?.country);
  console.log("recipeSelection", country);

  choiceRecipe()
  // 레시피 생성 파라미터
  const [recipeName, setRecipeName] = useState(routeCreation.params?.recipeName);
  console.log("recipeSelection", recipeName);

  const [isPressed, setIsPressed] = useState(false);
  
  
  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const onPress = () => {
    navigation.push("레시피 프로세스");
  };

  return (
    <View style={styles.container}>
      <Card mode="outlined">
        <Card.Title title={recipeName ? recipeName.join(", ") : "Unknown Recipe"}/>
        <Card.Content>
          <Text variant="titleLarge">재료</Text>
          <Text variant="bodyMedium">{ingredients ? ingredients.join(", ") : "No Ingredients"}</Text>
          <Text variant="bodyMedium">Description of the recipe here</Text>
        </Card.Content>
        <Card.Actions>
          <Pressable
            style={[styles.button, isPressed && styles.buttonPressed]}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text>선택</Text>
          </Pressable>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 100,
  },
  buttonPressed: {
    backgroundColor: "gray",
  },
});

export default RecipeSelection;
