import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./_components/ui/sidebar";
import { AppSidebar } from "./_components/Appsidebar";
import { AuthProvider } from "./context/AuthContext";

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
      <body className={`${mulish.className} overflow-x-hidden antialiased`}>
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SidebarTrigger />
              <div className="flex h-full w-full flex-col overflow-hidden">
                {children}
                <p></p>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
