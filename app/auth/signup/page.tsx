"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        name,
        gender,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="" disabled>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
