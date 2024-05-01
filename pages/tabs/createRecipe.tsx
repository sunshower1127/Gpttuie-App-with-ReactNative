import { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Text } from "react-native-paper";
import { ingredients } from "../../assets/ingredients";

export default function CreateRecipe() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState(
    ingredients.map((ingredient) => ({ label: ingredient, value: ingredient }))
  );

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable={true}
        multiple={true}
        placeholder="재료를 검색해주세요."
        maxHeight={400}
        multipleText={value.join(", ")}
      />
    </View>
  );
}
