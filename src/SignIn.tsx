"use client";

import { authClient } from "./lib/client";

export function SignIn() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome</h1>
      <button onClick={() => authClient.signIn.social({ provider: "google" })}>
        Sign in with Google
      </button>
    </div>
  );
}
