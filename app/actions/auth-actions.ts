"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role } },
  });

  if (error) {
    return { error: error.message }; // Return error to the client
  }

  if (data.user) {
    redirect("/home"); // This will now work because it's called directly
  }
}
