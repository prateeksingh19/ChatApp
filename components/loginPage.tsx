"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      await delay(200);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-[#1D232A]">Login Page</h2>
        </div>
        <form className="flex flex-col gap-y-3" onSubmit={handleLogin}>
          <label className="input input-bordered flex items-center gap-2 bg-[#F5F5DC] border-black">
            <input
              type="text"
              className="grow text-black focus:outline-none placeholder:text-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-[#F5F5DC] border-black">
            <input
              type="password"
              className="grow placeholder:text-black bg-[#F5F5DC] text-black focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {isSubmitting ? (
            <div className="btn w-1/2 mx-auto btn-square flex justify-center items-center">
              <span className="loading loading-spinner"></span>
            </div>
          ) : (
            <button
              type="submit"
              className="btn w-1/2 mx-auto block"
              disabled={isSubmitting}
            >
              Login
            </button>
          )}
        </form>
        <div className="flex gap-x-1 mt-2 justify-center text-black">
          <div>Create account?</div>
          <div
            className="cursor-pointer font-semibold"
            onClick={() => router.push("/auth/signup")}
          >
            Signup
          </div>
        </div>
      </div>
    </div>
  );
}
