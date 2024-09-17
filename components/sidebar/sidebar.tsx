"use client";
import toast from "react-hot-toast";
import Conversation from "./conversation";
import Logout from "./logout";
import Searchbox from "./searchbox";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedConversation } from "@/store/conversationSlice";

interface ConversationProps {
  id: string;
  name: string;
  profilePic: string;
}

export default function Sidebar() {
  const [conversations, setConversations] = useState<
    ConversationProps[] | null
  >(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchConversations() {
      try {
        const result = await axios.get<ConversationProps[]>("/api/user");
        setConversations(result.data);
      } catch (error) {
        toast.error("Failed to get conversations");
      }
    }
    fetchConversations();
  }, []);

  const handleSelectConversation = (conversation: ConversationProps) => {
    dispatch(setSelectedConversation(conversation));
  };

  return (
    <div className="flex flex-col p-8 w-1/3">
      <Searchbox />
      <div className="divider px-3"></div>
      <div className="flex flex-col overflow-auto">
        {conversations && conversations.length > 0 ? (
          conversations.map((conversation) => (
            <Conversation
              key={conversation.id}
              id={conversation.id}
              name={conversation.name}
              profilePic={conversation.profilePic}
              onSelect={() => handleSelectConversation(conversation)}
            />
          ))
        ) : (
          <p>No conversations available</p>
        )}
      </div>
      <div className="mt-auto pb-4">
        <Logout />
      </div>
    </div>
  );
}
