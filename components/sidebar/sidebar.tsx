import Conversation from "./conversation";
import Logout from "./logout";
import Searchbox from "./searchbox";

export default function Sidebar() {
  return (
    <div className="flex flex-col p-4">
      <Searchbox />
      <div className="divider px-3"></div>
      <div className="flex flex-col overflow-auto">
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
        <Conversation />
      </div>
      <div className="mt-auto pb-4">
        <Logout />
      </div>
    </div>
  );
}
