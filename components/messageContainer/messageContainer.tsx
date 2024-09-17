"use client";
import { useEffect } from "react";
import Header from "./header";
import MessageInput from "./messageInput";
import Message from "./message";
import "./index.css";
import { TiMessages } from "react-icons/ti";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setMessages } from "@/store/conversationSlice";

export default function MessageContainer() {
  const { data: session } = useSession();
  const selectedConversation = useSelector(
    (state: any) => state.conversation.selectedConversation
  );
  const messages = useSelector((state: any) => state.conversation.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation?.id) {
        try {
          const res = await axios.get(
            `/api/messages/${selectedConversation.id}`
          );
          dispatch(setMessages(res.data));
          console.log(res.data);
        } catch (error) {
          toast.error("Error retrieving messages");
        }
      }
    };
    fetchMessages();
  }, [selectedConversation?.id, dispatch]);

  const NoChatSelected = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <div>Welcome 👋 {session?.user?.name} ❄</div>
        <div>Select a chat to start messaging</div>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
  // TODO: add a skeleton when messages are loading
  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <div>
            {messages.length > 0 ? (
              messages.map((message: any) => (
                <Message key={message.id} message={message} />
              ))
            ) : (
              <p className="text-center">
                Send a message to start the conversation
              </p>
            )}
          </div>
        )}
      </div>
      {selectedConversation && <MessageInput />}
    </div>
  );
}
