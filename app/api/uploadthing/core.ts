import { verifySession } from "@/lib/session";
import { deleteDbAndCloudAvatar } from "@/lib/uploadthing";
import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

const auth = () => verifySession();
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const { userId } = await auth();
      await deleteDbAndCloudAvatar(userId);
      return { userId };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
