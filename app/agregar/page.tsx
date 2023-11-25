import { revalidatePath } from "next/cache";
import AddForm from "./add-form";

export default function AddPage() {
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
