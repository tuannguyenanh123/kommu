import { createClient } from "@/supabase/supabaseServer";

export const getUserWorkspaceData = async (workspaceIds: Array<string>) => {
  const supase = await createClient();

  const { data, error } = await supase
    .from("workspaces")
    .select("*")
    .in("id", workspaceIds);

  return [data, error];
};

export const getCurrentWorkspaceData = async (workspaceId: string) => {
    const supase = await createClient();
  
    const { data, error } = await supase
      .from("workspaces")
      .select("*")
      .eq("id", workspaceId)
      .single();
  
    return [data, error];
  };
  