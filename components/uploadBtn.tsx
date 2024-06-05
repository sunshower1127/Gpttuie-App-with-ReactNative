import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button } from "react-native-paper";
import { Recipe } from "../models/recipe";
import { MyNavigation } from "../models/stackNav";

export default function UploadBtn({ recipe }: { recipe: Recipe }) {
  const navigation = useNavigation<MyNavigation>();

  return (
    <Button
      mode="contained"
      onPress={() => {
        console.log("레시피", recipe);
        navigation.navigate("게시물_작성", recipe);
      }}
    >
      업로드
    </Button>
  );
}
