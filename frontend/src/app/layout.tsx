import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/Appsidebar";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Bankme",
  description: "Bankme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mulish.className} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          {children}
          <SidebarTrigger />
        </SidebarProvider>
      </body>
    </html>
  );
}
