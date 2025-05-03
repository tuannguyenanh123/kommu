import { getUserData } from "@/actions/get-user-data";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const currentUser = async () => {
  const user = await getUserData();
  if (!user) throw new UploadThingError("Unauthorized");
  return {
    userId: user?.id,
  };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  workspaceImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(() => currentUser())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
