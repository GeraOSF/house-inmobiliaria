import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  if (!isAdmin())
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const users = await clerkClient.users.getUserList();
  return NextResponse.json({ users });
}

export async function PATCH(req: NextRequest) {
  if (!isAdmin())
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { userId, canAddProperties } = body;
  const user = await clerkClient.users.getUser(userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: { canAddProperties },
  });
  return NextResponse.json({ message: "User updated" });
}

function isAdmin() {
  const { sessionClaims } = auth();
  return !!sessionClaims?.isAdmin;
}
