import { auth } from "@/lib/auth";
import { SignIn } from "@/SignIn";
import { SignOut } from "@/SignOut";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <SignIn />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Hello, {session.user.name}</h1>
      <p>Email: {session.user.email}</p>
      {session.user.image && (
        <img src={session.user.image} alt="Profile" style={{ width: 100 }} />
      )}
      <SignOut />
    </div>
  );
}
