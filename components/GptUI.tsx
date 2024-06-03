import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { Chip, Avatar } from "react-native-paper";
import { generateGPTResponse } from "../utils/gpt";
import TimerPicker from "./TimePicker";
import * as Haptics from "expo-haptics";

const App = () => {
  // 스크롤뷰 관련 함수
  const scrollViewRef = useRef<ScrollView | null>(null);

  //타이머 관련 함수
  const [showPicker, setShowPicker] = useState(false);
  const [timerDuration, setTimerDuration] = useState(null);
  // pickedDuration 객체를 밀리초로 변환하는 함수
  const convertDurationToMilliseconds = (duration) => {
    const { hours, minutes, seconds } = duration;
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };
  // pickedDuration 만큼의 시간이 지났을 때 진동 발생
  useEffect(() => {
    console.log("timerDuration: ", timerDuration);
    if (
      timerDuration !== null &&
      (timerDuration.hours !== 0 ||
        timerDuration.minutes !== 0 ||
        timerDuration.seconds !== 0)
    ) {
      const milliseconds = convertDurationToMilliseconds(timerDuration);

      const timer = setTimeout(async () => {
        alert("타이머가 종료되었습니다.");
        for (let i = 0; i < 5; i++) {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          // 진동 사이에 약간의 딜레이를 추가하여 진동이 구분되게 합니다.
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }, milliseconds);

      // GPT에게 타이머 설정을 알림
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "gpt",
          text: `네, ${
            timerDuration.hours ? timerDuration.hours + "시간 " : ""
          }${timerDuration.minutes ? timerDuration.minutes + "분 " : ""}${
            timerDuration.seconds ? timerDuration.seconds + "초 " : ""
          }타이머를 설정하였습니다.`,
        },
      ]);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [timerDuration]);

  //Gpt 관련함수
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { sender: "gpt", text: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);

  const onChangeText = (newText) => {
    setText(newText);
  };

  const sendMessage = async () => {
    if (text.trim()) {
      setMessages([...messages, { sender: "user", text }]);
      const gptResponse = await generateGPTResponse(text);
      console.log("gpt text: ", gptResponse);
      setMessages([
        ...messages,
        { sender: "user", text },
        { sender: "gpt", text: gptResponse },
      ]);
      setText("");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {showPicker && (
        <View>
          <TimerPicker
            setShowPicker={setShowPicker}
            timerDuration={timerDuration}
            setTimerDuration={setTimerDuration}
          />
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          margin: 5,
        }}
      >
        <Chip
          icon="information"
          style={{ marginHorizontal: 5 }}
          onPress={() =>
            Linking.openURL("https://m.10000recipe.com/recipe/view_weight.html")
          }
        >
          계량에 대해 알려주세요
        </Chip>
        <Chip
          icon="information"
          style={{ marginHorizontal: 5 }}
          onPress={() => {
            setShowPicker(true);
          }}
        >
          타이머를 설정해주세요
        </Chip>
      </View>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          >
            {message.sender === "user" ? (
              <>
                <View style={{ marginRight: 5 }}>
                  <Avatar.Image
                    size={24}
                    source={require("../assets/logo.png")}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "#e6e6e6",
                    borderRadius: 10,
                    padding: 10,
                    maxWidth: "90%",
                    alignSelf: "flex-end",
                  }}
                >
                  <Text>{message.text}</Text>
                </View>
              </>
            ) : (
              <>
                <View>
                  <Avatar.Image
                    size={24}
                    source={require("../assets/chatgpt.png")}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "green",
                    borderRadius: 10,
                    padding: 10,
                    maxWidth: "90%",
                    alignSelf: "flex-start",
                    marginLeft: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>{message.text}</Text>
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="궁금한 질문을 입력해 보세요"
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={sendMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
});

export default App;
