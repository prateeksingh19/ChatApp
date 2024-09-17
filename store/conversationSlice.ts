import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
  messages: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    resetConversationState(state) {
      state.selectedConversation = initialState.selectedConversation;
    },
  },
});

export const { setSelectedConversation, setMessages, resetConversationState } =
  conversationSlice.actions;
export default conversationSlice.reducer;
