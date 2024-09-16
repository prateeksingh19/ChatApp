"use client";
import { useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();
  return (
    <div className="bg-slate-500 px-8 py-4 mb-2 text-xl text-gray-900 font-bold">
      {session.data?.user?.name}
    </div>
  );
}
