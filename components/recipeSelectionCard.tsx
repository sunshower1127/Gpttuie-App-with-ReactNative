import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import { Recipe } from "../models/recipe";
import { MyNavigation } from "../models/stackNav";

// RecipeSelection에서 후보군을 보여줄때 사용되는 카드 컴포넌트
export default function RecipeSelectionCard({
  recipe,
  text,
}: {
  recipe: Recipe;
  text: string;
}) {
  const navigation = useNavigation<MyNavigation>();
  const { title } = recipe;
  const onPress = () => {
    navigation.push("레시피_생성", { recipe, text });
  };
  return (
    <Text
      variant="titleLarge"
      style={{
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "#303030",
        color: "#303030",
        margin: 10,
      }}
      onPress={onPress}
    >
      {title}
    </Text>
  );
}
