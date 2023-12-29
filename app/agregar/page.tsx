import { revalidatePath } from "next/cache";

import PropertyForm from "@/components/property-form";
import { redirect } from "next/navigation";
import { getIsAdmin } from "@/app/actions";

export default async function AddPage() {
  if (!(await getIsAdmin())) redirect("/");

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
}
