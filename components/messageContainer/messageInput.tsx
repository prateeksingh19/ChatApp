import { FiSend } from "react-icons/fi";

export default function MessageInput() {
  return (
    <div className="m-4">
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
        <FiSend className="cursor-pointer" />
      </label>
    </div>
  );
}
