import type { Metadata } from "next";

import { Open_Sans } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";

import { Providers } from "@/app/providers";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";
import { buttonVariants } from "@/components/ui/button";
import Header from "@/components/header";

import "./globals.css";
import "@uploadthing/react/styles.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "House Inmobiliaria",
  description: "Administra tus propiedades de manera sencilla y rapida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        elements: {
          card: "bg-background border border-primary shadow-none sm:shadow-lg sm:ring-2 sm:ring-primary -sm:p-2",
          cardBox: "rounded-lg",
          headerTitle: "text-foreground",
          headerSubtitle: "text-foreground/70 font-light",
          socialButtonsBlockButton: buttonVariants({
            variant: "outline",
            className: "!border",
          }),
          socialButtonsBlockButtonText: "text-foreground",
          dividerLine: "bg-muted",
          dividerText: "text-foreground/60",
          formFieldLabel: "text-foreground",
          formFieldInput: "bg-background !border !border-input text-foreground",
          formFieldInputShowPasswordIcon: "text-muted-foreground",
          footer:
            "bg-gradient-to-b from-background to-background border border-secondary rounded-lg",
        },
        variables: {
          colorPrimary: "hsl(142.1 70.6% 45.3%)",
        },
      }}
    >
      <html lang="es" suppressHydrationWarning>
        <body className={openSans.className}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Providers>
            <Header />
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
