import Header from "./header";
import MessageInput from "./messageInput";
import Message from "./message";
import "./index.css";
import { TiMessages } from "react-icons/ti";

export default function MessageContainer() {
  const noChatSelected = false;
  const NoChatSelected = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
          <div>Welcome 👋 Prateek ❄</div>
          <div>Select a chat to start messaging</div>
          <TiMessages className="text-3xl md:text-6xl text-center" />
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-col abcd w-screen">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        {noChatSelected ? (
          <NoChatSelected />
        ) : (
          <div>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
        )}
      </div>
      {!noChatSelected && <MessageInput />}
    </div>
  );
}
