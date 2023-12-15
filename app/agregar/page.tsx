import { revalidatePath } from "next/cache";

import AddForm from "./add-form";
import { redirect } from "next/navigation";
import { getIsAdmin } from "@/app/actions";

export default async function AddPage() {
  if (!(await getIsAdmin())) redirect("/");

  return (
    <main className="container flex flex-col items-center gap-2 p-2">
      <AddForm
        revalidate={async (path) => {
          "use server";
          revalidatePath(path);
        }}
      />
    </main>
  );
}
