import { View, Text, ScrollView } from "react-native";
import { List } from "react-native-paper";

// 재료 리스트
const IngredientList = ({ ingredients }) => (
  <ScrollView>
    {ingredients.map((ingredient, index) => {
      const [item, unit] = ingredient.split(/ (?=\d|약)/);

      return (
        <List.Item
          key={index}
          title={
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text>{item}</Text>
            </View>
          }
          description={unit}
          left={(props) => <List.Icon {...props} icon="bread-slice-outline" />}
        />
      );
    })}
  </ScrollView>
);

export default IngredientList;
