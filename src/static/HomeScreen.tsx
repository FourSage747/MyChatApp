import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, createChat, deleteChat } from '../core/chat/chatActions';
import Input from '../shared/components/Input';
import { AppDispatch, RootState } from '../core/store';

interface InputProps {
  placeholder: string;
  onSubmitEditing: (text: string) => void;
}

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();
  const { chats } = useSelector((state: RootState) => state.chat);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleCreateChat = (text: string) => {
    dispatch(createChat(text));
};

  return (
    <View style={styles.container}>
      {/* <Input placeholder="New Chat" onSubmitEditing={(e) => dispatch(createChat(e.nativeEvent.text))} /> */}
      <Input
        placeholder="New Chat"
        onSubmitEditing={(e: any) => handleCreateChat(e.nativeEvent.text)}
      />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <Text>{item.name}</Text>
            <Button title="Delete" onPress={() => dispatch(deleteChat(item.id))} />
            <Button title="Open" onPress={() => navigation.navigate('Chat', { chatId: item.id })} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  }
});

export default HomeScreen;
