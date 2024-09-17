import { useSelector } from "react-redux";

export default function Header() {
  const selectedConversation = useSelector(
    (state: any) => state.conversation.selectedConversation
  );

  return (
    <div>
      {selectedConversation ? (
        <div className="bg-slate-500 px-8 py-4 mb-2 text-xl text-gray-900 font-bold">
          {selectedConversation.name[0].toUpperCase() +
            selectedConversation.name.slice(1)}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
