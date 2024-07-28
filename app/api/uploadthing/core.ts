import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 20 },
  })
    .middleware(async () => {
      const { sessionClaims } = auth();
      const isAuthorised =
        !!sessionClaims?.isAdmin || !!sessionClaims?.canAddProperties;
      if (!isAuthorised) {
        throw new Error("Client is not authorized to upload files");
      }
      return {};
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
