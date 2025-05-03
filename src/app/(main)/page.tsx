import { getUserData } from "@/actions/get-user-data";
import { Routes } from "@/lib/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUserData()
  if(!user) {
    return redirect(Routes.Auth)
  }

  const userWorkspaceId = user.workspaces?.[0]
  
  if(!userWorkspaceId) {
    return redirect(Routes.CreateWorkspace)
  }

  if(userWorkspaceId) return redirect(Routes.Workspace + `/${userWorkspaceId}`)
}
