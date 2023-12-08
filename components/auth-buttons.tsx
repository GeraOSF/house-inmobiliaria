import {
  SignUpButton,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  return (
    <div>
      <SignedIn>
        <SignOutButton>
          <Button className="px-2" title="Cerrar sesión" variant="ghost">
            <LogOutIcon />
          </Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <div className="flex gap-2">
          <SignUpButton>
            <Button className="font-semibold">Crear cuenta</Button>
          </SignUpButton>
          <SignInButton>
            <Button variant="outline" className="font-semibold">
              Acceder
            </Button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
