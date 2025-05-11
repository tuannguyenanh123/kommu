import { getUserData } from "@/actions/get-user-data";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/get-user-workspace";
import InfoSection from "@/components/info-section";
import Sidebar from "@/components/sidebar";
import { Workspace } from "@/types/app";
import { redirect } from "next/navigation";
import React from "react";

interface WorkspacePageProps {
  params: Promise<{ id: string }>;
}

const WorkspacePage = async ({ params }: WorkspacePageProps) => {
  const { id } = await params;
  const userData = await getUserData();

  if (!userData) return redirect("/auth");

  const [userWorkspaceData, userWorkspaceError] = await getUserWorkspaceData(
    userData.workspaces!
  );
  const [currentWorkspaceData, currentWorkspaceError] =
    await getCurrentWorkspaceData(id);
  console.log(userWorkspaceData);
  console.log(currentWorkspaceData);
  return (
    <>
      <div className="hidden md:block">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorksapcesData={userWorkspaceData as Workspace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspaceChannels={[]}
          currentChannelId=""
        />

        {/* <NoDataScreen
          userId={userData.id}
          workspaceId={currentWorkspaceData.id}
          workspaceName={currentWorkspaceData.name}
        /> */}
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default WorkspacePage;
