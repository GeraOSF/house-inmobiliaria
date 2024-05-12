"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, MenuIcon, UsersIcon } from "lucide-react";
import { SignedIn, useUser } from "@clerk/nextjs";

import { ThemeSwitcher } from "@/components/theme-switcher";
import AuthButtons from "@/components/auth-buttons";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/sign-out-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const isAdmin = !!user?.publicMetadata?.isAdmin;

  return (
    <>
      <header className="container flex items-start justify-between gap-2 p-2">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button title="Inicio" className="p-2" variant="outline">
              <HomeIcon />
            </Button>
          </Link>
          <ThemeSwitcher />
        </div>
        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isAdmin && (
                <>
                  <DropdownMenuItem asChild>
                    <Link className={"cursor-pointer"} href="/manejar-usuarios">
                      <UsersIcon className="mr-2" />
                      Manejar usuarios
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem asChild>
                <SignOutButton withText />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
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
