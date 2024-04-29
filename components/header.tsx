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
    <header className="container flex items-start justify-between p-2">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button title="Inicio" className="p-2" variant="outline">
            <Home />
          </Button>
        </Link>
        <ThemeSwitcher />
      </div>
      {pathname === "/" && (
        <Image
          src="/banner.png"
          width={600}
          height={200}
          alt="Banner"
          className="hidden aspect-[3/1] rounded-md border md:block"
        />
      )}
      <AuthButtons />
    </header>
  );
}
