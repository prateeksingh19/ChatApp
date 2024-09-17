import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

interface MessageProps {
  key: any;
  message: {
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    conversationId: string;
  };
}

export default function Message({ key, message }: MessageProps) {
  const { data: session } = useSession();
  const selectedConversation = useSelector(
    (state: any) => state.conversation.selectedConversation
  );

  const sender = message.senderId === session?.user?.id;
  const chatClass = sender ? "chat-end" : "chat-start";
  const chatColor = sender ? "bg-blue-500" : "";

  return (
    <div className="">
      <div className={`chat ${chatClass}`}>
        <div className="chat-header mr-3 ml-2 mb-1">
          {sender ? "You" : `${selectedConversation.name}`}
        </div>
        <div className={`chat-bubble ${chatColor}`}>{message.message}</div>
        <div className="chat-footer opacity-50 mt-1">
          {sender ? "Delivered" : ""}
        </div>
      </div>
    </div>
  );
}
