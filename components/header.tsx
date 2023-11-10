"use client";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Header() {
  const pathname = usePathname();

  if (pathname.match(/\/ficha\/\d+/)) return null;

  return (
    <header className="container flex p-2">
      <ThemeSwitcher className="ml-auto" />
    </header>
  );
}
