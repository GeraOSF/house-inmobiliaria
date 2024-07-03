"use server";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { propertySchema, editPropertySchema } from "@/lib/validations";
import { auth, clerkClient, type User } from "@clerk/nextjs/server";
import { utapi } from "@/lib/uploadthing-server";

export async function getProperties() {
  return await db.property.findMany({
    orderBy: { id: "desc" },
  });
}

export async function createProperty(data: z.infer<typeof propertySchema>) {
  if (!hasPermissions(["isAdmin", "canAddProperties"]))
    throw new Error("Unauthorized");
  try {
    await db.property.create({ data });
    return;
  } catch (error) {
    console.error(error);
    if (data.imageKeys.length) {
      await utapi.deleteFiles(data.imageKeys);
    }
  }
}

export async function editProperty(data: z.infer<typeof editPropertySchema>) {
  if (!hasPermissions(["isAdmin"])) throw new Error("Unauthorized");
  try {
    await db.property.update({ where: { id: data.id }, data });
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProperty(id: number) {
  if (!hasPermissions(["isAdmin"])) throw new Error("Unauthorized");
  try {
    const property = await db.property.findUnique({
      select: { imageKeys: true },
      where: { id },
    });
    if (property && property.imageKeys.length) {
      await utapi.deleteFiles(property.imageKeys);
    }
    await db.property.delete({ where: { id } });
    return;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsers(): Promise<User[] | undefined> {
  if (!hasPermissions(["isAdmin"])) throw new Error("Unauthorized");
  try {
    const users = await clerkClient.users.getUserList();
    return users;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserPermissions({
  userId,
  canAddProperties,
}: {
  userId: string;
  canAddProperties: boolean;
}) {
  if (!hasPermissions(["isAdmin"])) throw new Error("Unauthorized");
  try {
    const user = await clerkClient.users.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { canAddProperties },
    });
    return;
  } catch (error) {
    console.error(error);
  }
}

function hasPermissions(permissions: ("isAdmin" | "canAddProperties")[]) {
  const { sessionClaims } = auth();
  return permissions.every((permission) => sessionClaims?.[permission]);
}
