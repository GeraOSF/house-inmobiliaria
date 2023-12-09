import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getIsAdmin } from "@/app/actions";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 20 },
  })
    .middleware(async () => {
      const { userId } = auth();
      if (!(await getIsAdmin(userId))) {
        throw new Error("Client is not authorized to upload files");
      }
      console.log(`User ${userId} is authorized to upload files`);
      return { userId };
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
