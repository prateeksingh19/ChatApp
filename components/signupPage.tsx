import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignupPage() {
  const [check, setCheck] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (password === confirmPassword && password !== "") {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [password, confirmPassword]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!check) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        name,
        gender,
        password,
        type: "signup",
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("An error occurred during sign up. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-[#1D232A]">Signup Page</h2>
        </div>
        <form
          className="flex flex-col gap-y-3"
          action=""
          onSubmit={handleSignUp}
        >
          <label className="input input-bordered flex items-center gap-2 bg-[#F5F5DC] border-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill=""
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow text-black focus:outline-none focus:border-black placeholder:text-black"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-[#F5F5DC] border-black focus:outline-none focus:border-black text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill=""
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow text-black focus:outline-none focus:border-black placeholder:text-black"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <div className="form-control">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-sm"
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
                />
                <span className="text-black ml-2">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  className="radio radio-sm"
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
                />
                <span className="text-black ml-2">Female</span>
              </label>
            </div>
          </div>
          <label className="input input-bordered flex items-center gap-2 bg-[#F5F5DC] border-black focus:outline-none focus:border-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill=""
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow placeholder:text-black bg-[#F5F5DC] text-black border-none focus:outline-none focus:border-black"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 bg-[#F5F5DC] border-black focus:outline-none focus:border-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill=""
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow placeholder:text-black bg-[#F5F5DC] text-black border-none focus:outline-none focus:border-black"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <input type="submit" className="btn w-1/2 mx-auto block" />
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
        <div className="flex gap-x-1 mt-2 justify-center text-black">
          <div>Already have an account?</div>
          <div
            className="cursor-pointer font-semibold"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
}
