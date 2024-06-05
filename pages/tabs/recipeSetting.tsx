import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Chip, Snackbar, Text, TextInput } from "react-native-paper";
import CountryBtn from "../../components/countryBtn";
import IngredigentsPicker from "../../components/ingredientsPicker";
import { Recipe } from "../../models/recipe";
import { MyNavigation } from "../../models/stackNav";

// 기존 CreateRecipe.tsx 파일을 RecipeSetting.tsx로 변경
// 유저가 레시피에 대한 설정을 하는 페이지임
// 예) 한식, 2인분, 밥, 김치, 된장
// 설정이 끝나면 stack의 RecipeSelection 페이지로 이동함
export default function RecipeSetting() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [title, setTitle] = useState(null);
  const [country, setCountry] = useState("한식");
  const [servingSize, setServingSize] = useState("1");
  const [extraRequest, setExtraRequest] = useState("");
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<MyNavigation>();
  const onPress = () => {
    const servingSizeInt = parseInt(servingSize);
    if (!ingredients || isNaN(servingSizeInt) || servingSizeInt <= 0) {
      setVisible(true);
      return;
    }
    const recipeSetting: Recipe = {
      title: title,
      servingSize: servingSizeInt,
      country,
      ingredients,
    };

    console.log("RecipeSetting -->");
    console.log("RecipeSetting: ", recipeSetting);
    console.log("<-- RecipeSetting");

    navigation.push("레시피_선택", recipeSetting);
  };

  const [isRecommended, setIsRecommended] = useState(true);
  const handleChipPress = (isRecommended) => {
    setIsRecommended(isRecommended);
    if (!isRecommended) {
      setTitle("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant={"titleLarge"}>
        레시피 설정
      </Text>

      <View style={{ flexDirection: "column" }}>
        <TextInput
          style={styles.item}
          label="인분"
          keyboardType="number-pad"
          mode="outlined"
          value={servingSize}
          onChangeText={(text) => setServingSize(text)}
        />
      </View>

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
      <View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Chip
            style={{ marginRight: 10, justifyContent: "center" }}
            onPress={() => handleChipPress(true)}
            selected={isRecommended}
          >
            gpttuie의 추천음식
          </Chip>
          <Chip
            style={{ marginRight: 10, justifyContent: "center" }}
            onPress={() => handleChipPress(false)}
            selected={!isRecommended}
          >
            원하는 음식
          </Chip>
        </View>

        <TextInput
          placeholder="만들고 싶은 음식을 입력하세요"
          keyboardType="default"
          mode="flat"
          onChangeText={setTitle}
          style={[styles.textInput, isRecommended && styles.hidden]}
        />

        <TextInput
          placeholder="추가로 요청할 사항을 입력하세요"
          keyboardType="default"
          mode="outlined"
          onChangeText={setExtraRequest}
          style={styles.textInput}
        />
      </View>

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
  textInput: {
    marginVertical: 10,
    width: 280,
  },
  hidden: {
    display: "none",
  },
});
