import { useSelector } from "react-redux";
import Image from "next/image";

interface ConversationProps {
  id: string;
  name: string;
  profilePic: string;
  onSelect: () => void;
}

export default function Conversation({
  id,
  name,
  profilePic,
  onSelect,
}: ConversationProps) {
  const selectedConversation = useSelector(
    (state: any) => state.conversation.selectedConversation
  );

  const isSelected = selectedConversation?.id === id;

  return (
    <div
      className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected ? "bg-sky-500" : ""}
    `}
      onClick={onSelect}
    >
      <div className="avatar online">
        <div className="w-14 rounded-full">
          <Image
            src={profilePic}
            alt={`${name}'s profile picture`}
            width={56}
            height={56}
            placeholder="empty"
            unoptimized={true}
          />
        </div>
      </div>
      <div>
        <div className="ml-2 text-lg font-medium">
          {name[0].toUpperCase() + name.slice(1)}
        </div>
      </div>
    </div>
  );
}
