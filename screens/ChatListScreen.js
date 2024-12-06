import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import { firestore, auth } from '../firebase';

export default function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const [contactPhone, setContactPhone] = useState('');

  useEffect(() => {
    const unsubscribe = firestore
      .collection('chatRooms')
      .where('participants', 'array-contains', auth.currentUser.phoneNumber)
      .onSnapshot((snapshot) => {
        setChats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    return unsubscribe;
  }, []);

  const createChatRoom = async () => {
    const roomId = [auth.currentUser.phoneNumber, contactPhone].sort().join('_');
    const chatRoomRef = firestore.collection('chatRooms').doc(roomId);

    const chatRoomSnapshot = await chatRoomRef.get();
    if (!chatRoomSnapshot.exists) {
      await chatRoomRef.set({
        participants: [auth.currentUser.phoneNumber, contactPhone],
        createdAt: new Date(),
      });
    }

    navigation.navigate('Chat', { chatId: roomId });
  };

  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { chatId: item.id })}>
            <Text>{item.participants.filter(p => p !== auth.currentUser.phoneNumber)}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        placeholder="Enter contact's phone number"
        onChangeText={setContactPhone}
      />
      <Button title="Start Chat" onPress={createChatRoom} />
    </View>
  );
}
