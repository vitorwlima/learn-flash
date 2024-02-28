import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Learn Flash",
  description: "Use flash cards to learn anything at any time.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`font-sans ${inter.variable} h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white`}
        >
          <TRPCReactProvider>
            <Toaster richColors />
            <header className="flex items-center justify-between border-b border-purple-800 px-10 py-5">
              <section className="flex items-center gap-4">
                <Link href="/">
                  <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                    Learn <span className="text-purple-600">Flash</span>
                  </h1>
                </Link>

                <Link href="/revision" className="border-l border-border pl-4">
                  Revisar
                </Link>
              </section>

              <UserButton />
            </header>
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
