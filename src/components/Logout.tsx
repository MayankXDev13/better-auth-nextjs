"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin"); // redirect to login page
        },
      },
    });
  };
  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
