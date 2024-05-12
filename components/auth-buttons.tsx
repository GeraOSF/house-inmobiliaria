import { SignUpButton, SignInButton, SignedOut } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  return (
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
  );
}
