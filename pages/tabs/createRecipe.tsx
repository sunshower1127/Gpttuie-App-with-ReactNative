import { View, Button } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../../navigations/stackNavigation";

export default function CreateRecipe() {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View>
      <Text variant={"headlineLarge"}>Create Recipe</Text>
      <Button
        title="Go to Stack Page"
        onPress={() => navigation.navigate("레시피 생성")}
      />
    </View>
  );
}