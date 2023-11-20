import { db } from "@/lib/prisma";
import DataTable from "./data-table";
import { columns } from "./columns";

export default async function Home() {
  const properties = await db.property.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main className="container p-2">
      <DataTable columns={columns} data={properties} />
    </main>
  );
}
