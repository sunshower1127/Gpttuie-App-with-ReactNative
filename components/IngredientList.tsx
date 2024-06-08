import { ScrollView, Text, View } from "react-native";
import { List } from "react-native-paper";

// 재료 리스트
const IngredientList = ({ ingredients }) => {
  const halfLength = Math.ceil(ingredients.length / 2);
  const firstHalf = ingredients.slice(0, halfLength);
  const secondHalf = ingredients.slice(halfLength);

  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", marginRight: -5, marginBottom: 40 }}>
          {firstHalf.map((ingredient, index) => {
            const [item, unit] = ingredient.split(/ (?=\d|약)/);

            return (
              <List.Item
                key={index}
                title={(props) => (
                  <Text numberOfLines={2} ellipsizeMode="tail">
                    {item}
                  </Text>
                )}
                description={unit}
                left={(props) => (
                  <List.Icon {...props} icon="bread-slice-outline" />
                )}
              />
            );
          })}
        </View>

        <View style={{ width: "50%", marginRight: 5, marginBottom: 40 }}>
          {secondHalf.map((ingredient, index) => {
            const [item, unit] = ingredient.split(/ (?=\d|약)/);

            return (
              <List.Item
                key={index}
                title={(props) => (
                  <Text numberOfLines={2} ellipsizeMode="tail">
                    {item}
                  </Text>
                )}
                description={unit}
                left={(props) => (
                  <List.Icon {...props} icon="bread-slice-outline" />
                )}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default IngredientList;
