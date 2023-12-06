import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { propertySchema } from "@/app/validations";

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
  await db.property.delete({ where: { id } });
  return NextResponse.json({ message: "Property deleted" });
}
