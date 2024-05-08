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
  const onPress = () => {
    navigation.push("레시피 프로세스");
  };

  return (
    <View style={styles.container}>
      <Card mode="outlined">
        <Card.Title title="레시피 제목" subtitle="예상 소요 시간" />
        <Card.Content>
          <Text variant="titleLarge">재료 </Text>
          <Text variant="bodyMedium">레시피 내용 요약</Text>
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
