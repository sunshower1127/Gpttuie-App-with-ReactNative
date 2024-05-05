import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { ingredients } from "../assets/ingredients";

export default function IngredigentsPicker(props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    ingredients.map((value) => ({
      label: value,
      value: value,
    }))
  );
  return (
    <DropDownPicker
      {...props}
      open={open}
      items={items}
      setOpen={setOpen}
      setItems={setItems}
      searchable={true}
      multiple={true}
      placeholder="재료를 선택해주세요."
      maxHeight={400}
      multipleText={props.value.join(", ")}
    />
  );
}
