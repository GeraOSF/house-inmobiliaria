import { auth } from "@clerk/nextjs";
import { z } from "zod";

import { db } from "@/lib/prisma";
import { propertySchema, editPropertySchema } from "@/lib/validations";

export async function getProperties() {
  return await db.property.findMany({
    orderBy: { id: "desc" },
  });
}

export async function createProperty(data: z.infer<typeof propertySchema>) {
  await fetch("/api/property", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function editProperty(data: z.infer<typeof editPropertySchema>) {
  await fetch("/api/property", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteProperty(id: number) {
  return await fetch("/api/property", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}

export async function getIsAdmin() {
  const { userId } = auth();
  if (!userId) return false;
  return (await db.admin.findUnique({
    select: { id: true },
    where: { userId },
  }))
    ? true
    : false;
}
