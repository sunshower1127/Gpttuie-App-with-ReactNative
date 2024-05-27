import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Snackbar, Text } from "react-native-paper";
import CountryBtn from "../../components/countryBtn";
import IngredigentsPicker from "../../components/ingredientsPicker";
import ServingSizePicker from "../../components/servingSizePicker";
import { Recipe } from "../../models/recipe";
import { MyNavigation } from "../../models/stackNav";

// 기존 CreateRecipe.tsx 파일을 RecipeSetting.tsx로 변경
// 유저가 레시피에 대한 설정을 하는 페이지임
// 예) 한식, 2인분, 밥, 김치, 된장
// 설정이 끝나면 stack의 RecipeSelection 페이지로 이동함
export default function RecipeSetting() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [country, setCountry] = useState("한식");
  const [servingSize, setServingSize] = useState(1);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<MyNavigation>();
  const onPress = () => {
    if (!ingredients) {
      setVisible(true);
      return;
    }

    const recipeSetting: Recipe = { servingSize, country, ingredients };

    console.log("RecipeSetting -->");
    console.log("RecipeSetting: ", recipeSetting);
    console.log("<-- RecipeSetting");

    navigation.push("레시피_선택", recipeSetting);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant={"titleLarge"}>
        레시피 설정
      </Text>
      <ServingSizePicker value={servingSize} onValueChange={setServingSize} />

      <CountryBtn
        style={[styles.item, { marginTop: 30 }]}
        value={country}
        onValueChange={setCountry}
      />

      <IngredigentsPicker
        style={styles.item}
        value={ingredients}
        setValue={setIngredients}
      />

      <Button
        mode={"contained"}
        style={styles.item}
        onPress={onPress}
        icon={"chef-hat"}
      >
        AI 레시피 생성
      </Button>
      <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
        재료를 선택해 주세요
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    marginBottom: 40,
  },

  item: {
    marginBottom: 30,
  },
});
