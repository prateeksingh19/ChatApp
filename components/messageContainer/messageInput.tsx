import { setMessages } from "@/store/conversationSlice";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
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
      });
      dispatch(setMessages([...messages, message]));
      setMessage("");
      toast.success("Message sent successfully");
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
