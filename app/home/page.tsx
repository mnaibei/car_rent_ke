import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createClient();

  // Check if a user is currently logged in
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/signup"); // If not logged in, send them back to sign up
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome back!</h1>
      <p className="mt-4">You are logged in with: {data.user.email}</p>

      {/* Sign out button to test later */}
      <form
        action={async () => {
          "use server";
          const supabase = await createClient();
          await supabase.auth.signOut();
          redirect("/signup");
        }}>
        <button className="mt-6 text-red-500">Sign Out</button>
      </form>
    </div>
  );
}
