import Conversation from "./conversation";
import Logout from "./logout";
import Searchbox from "./searchbox";

export default function Sidebar() {
  return (
    <div className="p-4">
      <Searchbox />
      <div className="divider px-3"></div>
      <div className="flex flex-col overflow-auto mb-10">
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
      <Logout />
    </div>
  );
}
