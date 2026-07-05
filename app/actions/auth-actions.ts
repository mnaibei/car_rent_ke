"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
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
    return { error: error.message };
  }

  if (data.user) {
    // Create the matching row in your own User table,
    // using the same id Supabase generated
    await prisma.user.create({
      data: {
        id: data.user.id,
        email: data.user.email!,
        role: role as "RENTER" | "OWNER",
      },
    });

    redirect("/home");
  }
}
