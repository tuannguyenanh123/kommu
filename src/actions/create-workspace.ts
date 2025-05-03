"use server";

import { createClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";
import { updateUserWorkspace } from "./update-user-workspace";
import { addMemberToWorkspace } from "./add-member-to-workspace";

export const createWorkspace = async ({
  imageUrl,
  name,
  slug,
  invite_code,
}: {
  imageUrl: string;
  name: string;
  slug: string;
  invite_code: string;
}) => {
  const dbSupabase = await createClient();
  const user = await getUserData();

  if (!user) {
    return {
      error: "No user data",
    };
  }

  const { error, data: workspaceRecord } = await dbSupabase
    .from("workspaces")
    .insert({
      image_url: imageUrl,
      name,
      super_admin: user?.id,
      slug,
      invite_code,
    })
    .select("*");

  if (error) {
    return {
      insertError: error,
    };
  }

  const [updateWorkspaceData, updateWorkspaceError] = await updateUserWorkspace(
    user?.id,
    workspaceRecord[0].id
  );

  if (updateWorkspaceError) {
    return {
      error: updateWorkspaceError,
    };
  }

  const [addMemberToWorkspaceData, addMemberToWorkspaceError] =
    await addMemberToWorkspace(user?.id, workspaceRecord[0].id);

  if (addMemberToWorkspaceError) {
    return {
      error: addMemberToWorkspaceError,
    };
  }
};
