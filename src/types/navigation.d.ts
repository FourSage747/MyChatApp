import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
};

export type ChatScreenRouteProp = RouteProp<RootStackParamList, "Chat">;
export type ChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Chat"
>;

export type ChatScreenProps = {
  route: ChatScreenRouteProp;
  navigation: ChatScreenNavigationProp;
};
