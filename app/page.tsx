import { auth } from "@clerk/nextjs/server";
import { columns, adminColumns } from "@/app/columns";
import DataTable from "@/app/data-table";
import { db } from "@/lib/prisma";

export default async function Home() {
  const { sessionClaims } = auth();
  const isAdmin = !!sessionClaims?.isAdmin;
  const canAddProperties = !!sessionClaims?.canAddProperties;

  const properties = await db.property.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main className="container p-2">
      <DataTable
        properties={properties}
        columns={isAdmin ? adminColumns : columns}
        isAdmin={isAdmin}
        canAddProperties={canAddProperties}
      />
    </main>
  );
}
