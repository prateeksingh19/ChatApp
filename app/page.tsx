"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };
  return (
    <div>
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}
