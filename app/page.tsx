import { auth } from "@clerk/nextjs/server";
import { columns, adminColumns } from "@/app/columns";
import DataTable from "@/app/data-table";
import { db } from "@/lib/prisma";
import Link from "next/link";

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
      <Link
        href="/politica-de-privacidad"
        className="text-sm underline opacity-50"
      >
        Política de Privacidad
      </Link>
    </main>
  );
}
