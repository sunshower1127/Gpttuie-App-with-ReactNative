import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { Recipe } from "../models/recipe";
import { MyNavigation } from "../models/stackNav";

// RecipeSelection에서 후보군을 보여줄때 사용되는 카드 컴포넌트
export default function RecipeSelectionCard({ recipe }: { recipe: Recipe }) {
  const navigation = useNavigation<MyNavigation>();
  const { title, ingredients } = recipe;
  const [isPressed, setIsPressed] = useState(false);

  const onPress = () => {
    navigation.push("레시피_생성", recipe);
  };
  return (
    <Card mode="outlined">
      <Card.Title title={title} />
      {/* <Card.Content>
        <Text variant="titleLarge">재료</Text>
        <Text variant="bodyMedium">
          {ingredients ? ingredients.join(", ") : "No Ingredients"}
        </Text>
        <Text variant="bodyMedium">Description of the recipe here</Text>
      </Card.Content> */}
      <Card.Actions>
        <Pressable
          style={[styles.button, isPressed && styles.buttonPressed]}
          onPress={onPress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
        >
          <Text>선택</Text>
        </Pressable>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
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
