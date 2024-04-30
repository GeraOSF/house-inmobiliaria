"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";

import { ThemeSwitcher } from "@/components/theme-switcher";
import AuthButtons from "@/components/auth-buttons";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();

  return (
    <>
      <header className="container flex items-start justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button title="Inicio" className="p-2" variant="outline">
              <Home />
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
        <AuthButtons />
      </header>
      {pathname === "/" && (
        <Image
          src="/banner.jpg"
          width={2600}
          height={200}
          alt="Banner"
          className="hidden aspect-[13/1] border md:block"
        />
      )}
    </>
  );
}
