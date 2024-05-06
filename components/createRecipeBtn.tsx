import { View } from "react-native";
import { Icon } from "react-native-paper";

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
