"use client";
import Conversation from "./conversation";
import Logout from "./logout";
import Searchbox from "./searchbox";
import axios from "axios";
import { useEffect, useState } from "react";

interface ConversationProps {
  key: string;
  id: string;
  name: string;
  profilePic: string;
}

export default function Sidebar() {
  const [conversation, setConversation] = useState<ConversationProps[] | null>(
    null
  );

  useEffect(() => {
    async function fetchConversation() {
      try {
        const result = await axios.get<ConversationProps[]>("/api/user");
        setConversation(result.data);
      } catch (error) {
        console.error("Failed to fetch conversation:", error);
      }
    }
    fetchConversation();
  }, []);
  console.log(conversation);

  return (
    <div className="flex flex-col p-8 w-1/3">
      <Searchbox />
      <div className="divider px-3"></div>
      <div className="flex flex-col overflow-auto">
        {conversation && conversation.length > 0 ? (
          conversation.map((conv) => (
            <Conversation
              key={conv.id}
              id={conv.id}
              name={conv.name}
              profilePic={conv.profilePic}
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
