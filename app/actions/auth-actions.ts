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
    console.error("Supabase signUp error:", error.message);
    return { error: error.message };
  }

  console.log("Supabase user created:", data.user?.id, data.user?.email);

  if (data.user) {
    try {
      const newUser = await prisma.user.create({
        data: {
          id: data.user.id,
          email: data.user.email!,
          role: role as "RENTER" | "OWNER",
        },
      });
      console.log("Prisma user created:", newUser);
    } catch (dbError) {
      console.error("Prisma user.create failed:", dbError);
      return { error: "Failed to create user profile in database" };
    }

    redirect("/home");
  }
}
