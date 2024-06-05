import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { Recipe } from "../models/recipe";
import { MyNavigation } from "../models/stackNav";

// RecipeSelection에서 후보군을 보여줄때 사용되는 카드 컴포넌트
export default function RecipeSelectionCard({ recipe }: { recipe: Recipe }) {
  const navigation = useNavigation<MyNavigation>();
  const { title } = recipe;
  const onPress = () => {
    navigation.push("레시피_생성", recipe);
  };
  return (
    <Button
      mode="contained-tonal"
      style={{
        borderRadius: 80, // 이 값은 버튼의 너비/높이의 절반 이상이어야 합니다.
        width: 160,
        height: 160,
        justifyContent: "center", // 버튼 내부의 텍스트를 중앙에 배치합니다.
      }}
      onPress={onPress}
    >
      {title}
    </Button>
  );
}
