import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Picker from "react-native-picker-select";

export default function ServingSizePicker(props) {
  const theme = useTheme();
  const pickerStyle = {
    inputAndroid: {
      width: 36,
      height: 36,
      fontSize: 22,
      padding: 10,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    inputIOS: {
      width: 36,
      height: 36,
      fontSize: 22,
      padding: 10,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Picker
        {...props}
        style={pickerStyle}
        items={[
          { label: "1", value: 1 },
          { label: "2", value: 2 },
          { label: "3", value: 3 },
          { label: "4", value: 4 },
          { label: "5", value: 5 },
          { label: "6", value: 6 },
          { label: "7", value: 7 },
          { label: "8", value: 8 },
          { label: "9", value: 9 },
        ]}
      />
      <Text> 인분</Text>
    </View>
  );
}
