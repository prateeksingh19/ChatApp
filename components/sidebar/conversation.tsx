import Image from "next/image";

interface ConversationProps {
  key: string;
  id: string;
  name: string;
  profilePic: string;
}

export default function Conversation({
  key,
  name,
  profilePic,
}: ConversationProps) {
  return (
    <div className="">
      <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <Image
              src={profilePic}
              alt="Pic"
              width={1}
              height={1}
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
      <div className="divider"></div>
    </div>
  );
}
