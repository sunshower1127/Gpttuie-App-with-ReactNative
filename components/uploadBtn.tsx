import React from "react";
import { Button } from "react-native-paper";
import { Recipe } from "../models/recipe";
import { useNavigation } from "@react-navigation/native";
import { MyNavigation } from "../models/stackNav";

export default function uploadBtn({ recipe }: { recipe: Recipe }) {
  const navigation = useNavigation<MyNavigation>();
  return (
    <>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("게시물_작성", recipe)}
      >
        Share
      </Button>
    </>
  );
}
