import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Button,
  Divider,
  SegmentedButtons,
  Snackbar,
  Text,
  useTheme,
} from "react-native-paper";
import { ingredients } from "../../assets/ingredients";
import IngredigentsPicker from "../../components/ingredientsPicker";
import CountryBtn from "../../components/countryBtn";
import ServingSizePicker from "../../components/servingSizePicker";

export default function CreateRecipe() {
  const [ingredients, setIngredients] = useState([]);
  const [country, setCountry] = useState("한식");
  const [servingSize, setServingSize] = useState(1);
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  const onPress = () => {
    if (ingredients.length === 0) {
      setVisible(true);
      return;
    }
    console.log("AI 레시피 생성");
    console.log("servingSize", servingSize);
    console.log("country", country);
    console.log("ingredients", ingredients);
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
