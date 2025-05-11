import { createClient } from "@/supabase/supabaseServer"

export const createChannel = async ({
    name,
    userId,
    workspaceId,
  }: {
    name: string
    userId: string
    workspaceId: string
  }) => {
    const supabase = await createClient();
}

export const userWorkspaceChannels = async () => {
    const supabase = await createClient();
}