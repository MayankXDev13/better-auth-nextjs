"use client";
import { authClient } from "@/lib/auth-client";
// import { redirect } from "next/navigation";
import React, { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {
  //   data: session,
  //   isPending, //loading state
  //   error, //error object
  //   refetch, //refetch the session
  // } = authClient.useSession();

  // useEffect(() => {
  //   if (session) {
  //     redirect("/dashboard")
  //   }
  // }, [session])

  const handleSubmit = async (e: any) => {
    // handle submit logic
    e.preventDefault();

    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
        rememberMe: true,
      },
      {
        //callbacks
      }
    );

    console.log(`data ${data}`);
    console.log(`err ${error?.message}`);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

        <input
          type="text"
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full p-3 mb-6 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-400"
        />

        <button
          type="submit"
          className="w-full p-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
