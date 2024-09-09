import { type FileRouter, createUploadthing } from "uploadthing/next";
import { deleteDbAndCloudAvatar } from "@/actions/deleteDbAndCloudAvatar";
import { verifySession } from "@/lib/session";
const f = createUploadthing();

const auth = () => verifySession();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async () => {
      const { userId } = await auth();
      return { userId };
    })
    .onUploadComplete(async ({ metadata }) => {
      await deleteDbAndCloudAvatar(metadata.userId);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
