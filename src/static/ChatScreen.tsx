import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Input from "../shared/components/Input";
import { io } from "socket.io-client";
import { ChatScreenProps } from "../types/navigation";

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const { chatId } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const socket = io(
    "https://52ff844a-3527-4bdc-909d-857f6b1f433c.mock.pstmn.io"
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket");
      socket.emit("join", chatId);
    });

    socket.on("message", (message) => {
      setMessages((prevMessages: any[]) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  const sendMessage = () => {
    socket.emit("message", { chatId, text: message });
    setMessages((prevMessages) => [...prevMessages, { text: message }]);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <Text key={index}>{msg.text}</Text>
        ))}
      </View>
      <Input
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={sendMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
});

export default ChatScreen;
