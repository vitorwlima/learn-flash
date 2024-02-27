import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";
import Link from "next/link";

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
          className={`font-sans ${inter.variable} h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]`}
        >
          <TRPCReactProvider>
            <header className="flex items-center justify-between border-b border-purple-800 p-5 text-white">
              <Link href="/">
                <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  Learn <span className="text-purple-600">Flash</span>
                </h1>
              </Link>

              <UserButton />
            </header>
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
