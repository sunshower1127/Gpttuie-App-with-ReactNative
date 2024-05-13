import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../navigations/stackNavigation";

const SimpleRecipeCard = () => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => {
    setIsPressed(true);
  };
  const handlePressOut = () => {
    setIsPressed(false);
  };
  const navigation = useNavigation<RootStackNavigationProp>();

  const [recipeInfo, setRecipeInfo] = useState([
    {
      title: "치즈 토스트",
      estimatedTime: "10분",
      ingredients: "식빵, 치즈, 버터, 계란",
      description: "간단하고 맛있는 치즈 토스트 만들기",
    },
  ]);

  const onPress = () => {
    navigation.push("레시피 프로세스");
  };

  return (
    <View style={styles.container}>
      <Card mode="outlined">
        <Card.Title
          title={recipeInfo[0].title}
          subtitle={recipeInfo[0].estimatedTime}
        />
        <Card.Content>
          <Text variant="titleLarge">재료</Text>
          <Text variant="bodyMedium">{recipeInfo[0].ingredients}</Text>
          <Text variant="bodyMedium">{recipeInfo[0].description}</Text>
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

export default SimpleRecipeCard;
