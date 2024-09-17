"use client";
import { resetConversationState } from "@/store/conversationSlice";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    dispatch(resetConversationState());
    router.push("/auth/login");
  };
  return (
    <div className="">
      <BiLogOut className="w-8 h-8 cursor-pointer" onClick={handleLogout} />
    </div>
  );
}
