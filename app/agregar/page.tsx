import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import PropertyForm from "@/components/property-form";
import { redirect } from "next/navigation";

export default async function AddPage() {
  const { sessionClaims } = auth();
  const isAuthorised =
    sessionClaims?.isAdmin || sessionClaims?.canAddProperties;

  if (isAuthorised) {
    return (
      <main className="container flex flex-col items-center gap-2 p-2">
        <PropertyForm
          revalidate={async (path) => {
            "use server";
            revalidatePath(path);
          }}
        />
      </main>
    );
  } else redirect("/");
}
