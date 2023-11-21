import { db } from "@/lib/prisma";

export async function getProperties() {
  return await db.property.findMany({
    orderBy: { id: "desc" },
  });
}
