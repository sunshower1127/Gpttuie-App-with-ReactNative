import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  ChatGptProvider,
  useChatGpt,
  ChatGptError,
} from "react-native-chatgpt";

interface Message {
  text: string;
  isUser: boolean;
  messageId?: string;
  conversationId?: string;
}

const ChatScreen = () => {
  const { sendMessage } = useChatGpt();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        const {
          message: response,
          messageId,
          conversationId,
        } = await sendMessage(message);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, isUser: true },
          { text: response, isUser: false, messageId, conversationId },
        ]);
        setMessage("");
      } catch (error) {
        if (error instanceof ChatGptError) {
          console.error("Error sending message:", error);
        } else {
          console.error("Unknown error:", error);
        }
      }
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => `${index}`}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="메시지를 입력하세요..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

const App = () => {
  return (
    <ChatGptProvider
      requestTimeout={60000}
      streamedRequestTimeout={30000}
      renderCustomCloseIcon={(closeModal) => (
        <TouchableOpacity onPress={closeModal}>
          <Text>Close</Text>
        </TouchableOpacity>
      )}
    >
      <ChatScreen />
    </ChatGptProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#E8E8E8",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default App;
