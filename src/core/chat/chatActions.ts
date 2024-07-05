import { createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

export interface Chat {
  id: string;
  name: string;
}

export const createChat = createAsyncThunk(
  "chat/create",
  async (name: string) => {
    const response = await chatService.createChat(name);
    return response.data;
  }
);

export const fetchChats = createAsyncThunk("chat/fetchAll", async () => {
  const response = await chatService.fetchChats();
  return response.data;
});

export const deleteChat = createAsyncThunk(
  "chat/delete",
  async (id: string) => {
    await chatService.deleteChat(id);
    return id;
  }
);
