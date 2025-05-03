import { createClient } from "@/supabase/supabaseServer";

export const addMemberToWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const dbSupabase = await createClient();

  const { data: addMemberToWorkspaceData, error: addMemberToWorkspaceError } =
    await dbSupabase.rpc("add_member_to_workspace", {
      user_id: userId,
      workspace_id: workspaceId,
    });

  return [addMemberToWorkspaceData, addMemberToWorkspaceError]
};
