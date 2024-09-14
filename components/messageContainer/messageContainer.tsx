import Header from "./header";
import MessageInput from "./messageInput";
import Message from "./message";
import "./index.css";

export default function MessageContainer() {
  return (
    <div className="flex flex-col abcd w-screen">
      <Header />
      <div className="flex-1 overflow-auto p-4 scrollbar-custom">
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
      <MessageInput />
    </div>
  );
}
