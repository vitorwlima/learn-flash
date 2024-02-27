import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";

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
        <body className={`font-sans ${inter.variable} bg-gradient-to-b from-[#2e026d] to-[#15162c] h-screen`}>
          <TRPCReactProvider>
            <header className="text-white p-5 border-b border-purple-800">
              <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                Learn <span className="text-purple-600">Flash</span>
              </h1>
            </header>
            <main>{children}</main>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
