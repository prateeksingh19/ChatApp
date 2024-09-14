import { IoSearchSharp } from "react-icons/io5";

export default function Searchbox() {
  return (
    <form className="flex items-center">
      <input
        type="text"
        className="input input-bordered rounded-full flex-grow mr-2"
        placeholder="Search..."
      />
      <button type="submit" className="btn btn-circle bg-sky-300 text-white">
        <IoSearchSharp className="w-6 h-6" />
      </button>
    </form>
  );
}
