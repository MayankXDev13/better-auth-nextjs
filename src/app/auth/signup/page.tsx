"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React, { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // handle submit logic
    const { data, error } = await authClient.signUp.email(
      {
        name: name, // required
        email: email, // required
        password: password, // required
        callbackURL: "/dashboard",
      },
      {
        // ctx => is context object
        onRequest: (ctx) => {
          //show loading
          console.log("making the request...");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          redirect("/dashboard");
        },
        onError: (ctx) => {
          // display the error message
          console.log(`err ${ctx}`);
        },
      }
    );

    console.log(`data ${data?.user}`);
    console.log(`err ${error?.message}`);
  };

  const handleGoogleSignUp = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });

    console.log(`data ${data}`);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 mb-4 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-400"
        />

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
          Sign Up
        </button>

        <h1>OR</h1>
        <button onClick={handleGoogleSignUp}>SignUp with Google</button>
      </form>
    </div>
  );
}

export default SignUp;
