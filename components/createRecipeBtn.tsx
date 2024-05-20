import { View } from "react-native";
import { Icon } from "react-native-paper";

// 바텀 네비게이션바 가운데에 있는 레시피 생성 버튼
export default function CreateRecipeBtn() {
  return (
    <View
      style={{
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: -15,
      }}
    >
      <Icon source="plus" size={30} />
    </View>
  );
}
