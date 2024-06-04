import { View, Text, ScrollView } from "react-native";
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
                left={(props) => (
                  <List.Icon {...props} icon="bread-slice-outline" />
                )}
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
                left={(props) => (
                  <List.Icon {...props} icon="bread-slice-outline" />
                )}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default IngredientList;
