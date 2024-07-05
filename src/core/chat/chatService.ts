import axios from "axios";
import { Chat } from "./chatActions";

const API_URL = "https://52ff844a-3527-4bdc-909d-857f6b1f433c.mock.pstmn.io";

const generateUniqueId = () => {
  return Math.random().toString();
};

const createChat = (name: string) => {
  const id = generateUniqueId();
  return axios.post<Chat>(`${API_URL}/chats`, { id, name });
};

const fetchChats = () => {
  return axios.get<Chat[]>(`${API_URL}/chats`);
};

const deleteChat = (id: string) => {
  return axios.delete(`${API_URL}/chats/${id}`);
};

export default {
  createChat,
  fetchChats,
  deleteChat,
};
