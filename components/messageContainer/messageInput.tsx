import { setMessages } from "@/store/conversationSlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const selectedConversation = useSelector(
    (state: any) => state.conversation.selectedConversation
  );
  const messages = useSelector((state: any) => state.conversation.messages);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    try {
      await axios.post(`/api/messages/send/${selectedConversation.id}`, {
        message,
        senderId: session?.user?.id,
      });

      dispatch(
        setMessages([
          ...messages,
          {
            senderId: session?.user?.id,
            receiverId: selectedConversation.id,
            message,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            conversationId: selectedConversation.id,
          },
        ])
      );
      setMessage("");
    } catch (error) {
      toast.error("Error while sending message");
    }
  }

  return (
    <div className="m-4 mb-8">
      <form onSubmit={sendMessage}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="cursor-pointer">
            <FiSend />
          </button>
        </label>
      </form>
    </div>
  );
}
