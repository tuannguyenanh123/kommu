"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/supabase/supabaseServer";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup({ email }: { email: string }) {
  const supabase = await createClient();
  const currentOrigin = process.env.NEXT_PUBLIC_CURRENT_ORIGIN;

  const payload = {
    email,
    options: {
      emailRedirectTo: currentOrigin,
    },
  };

  const { error, data } = await supabase.auth.signInWithOtp(payload);

  if (error) {
    redirect("/error");
  }

  return JSON.stringify(data)
}
