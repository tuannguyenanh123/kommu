import { createClient } from "@/supabase/supabaseServer";
import { User } from "@/types/app";

export const getUserData = async (): Promise<User | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.log(error);
    return null;
  }
  return data ? data[0] : null;
};
