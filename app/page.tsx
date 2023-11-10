import Link from "next/link";
import { Plus } from "lucide-react";

import { db } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table";
import { columns } from "./columns";

export default async function Home() {
  const properties = await db.property.findMany();

  return (
    <main className="container p-2">
      <Button className="mb-2 w-fit self-start" asChild>
        <Link href="/agregar">
          <Plus className="h-7 w-7" />
          <span className="text-base font-semibold">Agregar</span>
        </Link>
      </Button>
      <DataTable columns={columns} data={properties} />
    </main>
  );
}
