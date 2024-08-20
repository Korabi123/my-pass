import type { Metadata } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const calistoga = Calistoga({ subsets: ["latin"], weight: ["400"], variable: "--font-calistoga" });

export const metadata: Metadata = {
  title: "MyPass",
  description: "MyPass is a password manager that helps you manage your passwords.",
  keywords: "password, password manager, password manager app, password manager app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.variable, calistoga.variable, "font-inter antialiased")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange={true}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
