import { ScrollView, Text, View } from "react-native";
import { List } from "react-native-paper";

// 재료 리스트
const IngredientList = ({ ingredients }) => {
  const halfLength = Math.ceil(ingredients.length / 2);
  const firstHalf = ingredients.slice(0, halfLength);
  const secondHalf = ingredients.slice(halfLength);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: "50%" }}>
        <ScrollView>
          {firstHalf.map((ingredient, index) => {
            const [item, unit] = ingredient.split(/ (?=\d|약)/);

            return (
              <List.Item
                key={index}
                title={<Text>{item}</Text>}
                description={unit}
                left={(props) => (
                  <List.Icon {...props} icon="bread-slice-outline" />
                )}
                style={{ marginLeft: -10 }} // 왼쪽 여백 조정
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={{ width: "50%" }}>
        <ScrollView>
          {secondHalf.map((ingredient, index) => {
            const [item, unit] = ingredient.split(/ (?=\d|약)/);

            return (
              <List.Item
                key={index}
                title={<Text>{item}</Text>}
                description={unit}
                left={(props) => (
                  <List.Icon {...props} icon="bread-slice-outline" />
                )}
                style={{ marginLeft: -10 }} // 왼쪽 여백 조정
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default IngredientList;
