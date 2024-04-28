import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-paper";

export default function CreateRecipeBtn() {
  return (
    <View style={styles.icon}>
      <Icon source="plus" size={30} />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -15,
  },
});
