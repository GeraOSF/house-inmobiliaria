import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";
import { formSchema } from "@/app/validations";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsedBody = formSchema.safeParse(body);

  if (!parsedBody.success)
    return NextResponse.json(parsedBody.error, { status: 400 });

  const { data } = parsedBody;

  await db.property.create({ data });

  return NextResponse.json({ message: "Property created" });
}
