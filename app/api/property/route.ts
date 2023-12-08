import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

import { db } from "@/lib/prisma";
import { propertySchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedBody = propertySchema.safeParse(body);

  if (!parsedBody.success)
    return NextResponse.json(parsedBody.error, { status: 400 });

  const { data } = parsedBody;

  await db.property.create({ data });

  return NextResponse.json({ message: "Property created" });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const property = await db.property.findUnique({
    select: { imageKeys: true },
    where: { id },
  });
  if (property && property.imageKeys.length) {
    const utapi = new UTApi();
    await utapi.deleteFiles(property.imageKeys);
  }
  await db.property.delete({ where: { id } });
  return NextResponse.json({ message: "Property deleted" });
}
