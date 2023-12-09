import { db } from "@/lib/prisma";

export async function getProperties() {
  return await db.property.findMany({
    orderBy: { id: "desc" },
  });
}

export async function deleteProperty(id: number) {
  return await fetch("/api/property", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}

export async function getIsAdmin(userId: string | null) {
  if (!userId) return false;
  return (await db.admin.findUnique({
    select: { id: true },
    where: { userId },
  }))
    ? true
    : false;
}
