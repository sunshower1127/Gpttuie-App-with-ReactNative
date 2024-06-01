import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Chip } from "react-native-paper";

const App = () => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          margin: 5,
        }}
      >
        <Chip
          icon="information"
          style={{ marginHorizontal: 5 }}
          onPress={() => console.log("Pressed")}
        >
          계량에 대해 알려주세요
        </Chip>
        <Chip
          icon="information"
          style={{ marginHorizontal: 5 }}
          onPress={() => console.log("Pressed")}
        >
          타이머를 설정해주세요
        </Chip>
      </View>
      <TextInput
        style={styles.input}
        placeholder="궁금한 질문을 입력해 보세요"
        onChangeText={onChangeText}
        value={text}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
