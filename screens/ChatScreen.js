import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { firestore, auth } from '../firebase';

export default function ChatScreen({ route }) {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const unsubscribe = firestore
      .collection('chatRooms')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    return unsubscribe;
  }, [chatId]);

  const sendMessage = () => {
    firestore.collection('chatRooms').doc(chatId).collection('messages').add({
      text: newMessage,
      createdAt: new Date(),
      user: auth.currentUser.phoneNumber,
    });
    setNewMessage('');
  };

  return (
    <View>
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.user}: {item.text}</Text>}
      />
      <TextInput placeholder="Type a message" onChangeText={setNewMessage} value={newMessage} />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
