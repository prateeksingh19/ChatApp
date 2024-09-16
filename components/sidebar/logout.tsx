"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };
  return (
    <div className="">
      <BiLogOut className="w-8 h-8 cursor-pointer" onClick={handleLogout} />
    </div>
  );
}
