"use client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function SignOutButton({
  withText = false,
}: {
  withText?: boolean;
}) {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <Button
      onClick={() => signOut(() => router.push("/"))}
      className="w-full justify-start gap-2 px-2"
      title="Cerrar sesión"
      variant="ghost"
    >
      <LogOutIcon />
      {withText && "Cerrar sesión"}
    </Button>
  );
}
