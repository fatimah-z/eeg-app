import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Background from "../assets/background.jpg";

export default function App() {
  const [messages, setMessages] = useState([]);

  const BOT = {
    _id: 2,
    name: "Mr Bot",
    avatar:
      "https://img.favpng.com/11/14/1/computer-icons-clip-art-online-chat-internet-bot-scalable-vector-graphics-png-favpng-RY2PzfedpgxxdpgVr4VUnfq8V.jpg",
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hi there! How can I help you?",
        createdAt: new Date(),
        user: BOT,
      },
    ]);
  }, []);

  const sendBotResponse = (text) => {
    let msg = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT,
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [msg])
    );
  };

  const onSend = (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    let message = messages[0].text;
    axios
      .get(`https://76d6-39-43-137-233.eu.ngrok.io?msg=${message}`)
      .then((result) => {
        sendBotResponse(result?.data?.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
