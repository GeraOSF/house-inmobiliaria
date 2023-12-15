import { NextRequest, NextResponse } from "next/server";
import { utapi } from "@/lib/uploadthing-server";

import { db } from "@/lib/prisma";
import { propertySchema } from "@/lib/validations";
import { getIsAdmin } from "@/app/actions";

export async function POST(req: NextRequest) {
  if (!(await getIsAdmin()))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsedBody = propertySchema.safeParse(body);

  if (!parsedBody.success)
    return NextResponse.json(parsedBody.error, { status: 400 });

  const { data } = parsedBody;

  await db.property.create({ data });

  return NextResponse.json({ message: "Property created" });
}

export async function DELETE(req: NextRequest) {
  if (!(await getIsAdmin()))
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  const property = await db.property.findUnique({
    select: { imageKeys: true },
    where: { id },
  });
  if (property && property.imageKeys.length) {
    await utapi.deleteFiles(property.imageKeys);
  }
  await db.property.delete({ where: { id } });
  return NextResponse.json({ message: "Property deleted" });
}
