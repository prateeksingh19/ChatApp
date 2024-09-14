import MessageContainer from "./messageContainer/messageContainer";
import Sidebar from "./sidebar/sidebar";

export default function DashBoard() {
  return (
    <div className="flex abcd rounded-lg h-full w-full bg-gray-600">
      <Sidebar />
      <MessageContainer />
    </div>
  );
}
