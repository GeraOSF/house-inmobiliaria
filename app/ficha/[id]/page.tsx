import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";

import PDF_Viewer from "@/components/pdf-viewer";
import Datasheet from "@/components/datasheet";

export default async function DatasheetPage({
  params,
}: {
  params: { id: string };
}) {
  const id = +params.id;
  if (isNaN(id)) redirect("/404");

  const property = await db.property.findUnique({
    where: { id },
  });

  if (!property) redirect("/404");

  return (
    <PDF_Viewer
      datasheet={<Datasheet property={property} />}
      className="h-screen w-full"
    />
  );
}
