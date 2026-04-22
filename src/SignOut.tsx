"use client";

import { authClient } from "./lib/client";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}
