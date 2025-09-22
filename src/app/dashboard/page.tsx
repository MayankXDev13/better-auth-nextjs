import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const Deshboard = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session) {
    redirect("/auth/signin")
  }

  console.log(`session ${session}`);
  

  return (
    <h1 className="flex h-screen justify-center items-center">Deshboard, {session.user.name}</h1>
  );
};

export default Deshboard;
