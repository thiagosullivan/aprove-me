"use client";

import { File, UserRound } from "lucide-react";
import * as React from "react";

import { NavMain } from "@/app/_components/navMain";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/_components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import LogoutBtn from "./logoutBtn";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    // avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Cedente",
      url: "#",
      icon: UserRound,
      isActive: true,
      items: [
        {
          title: "Adicionar Cedente",
          url: "/assignors/add-assignor",
        },
        {
          title: "Listar Cedentes",
          url: "/assignors/list-assignors",
        },
      ],
    },
    {
      title: "Pagáveis",
      url: "#",
      icon: File,
      items: [
        {
          title: "Adicionar pagável",
          url: "/payables/add-payable",
        },
        {
          title: "Listar pagáveis",
          url: "/payables/list-payable",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, setUser } = useAuth();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/">
          <Image
            src="/assets/bankme-logo-2.png"
            width={50}
            height={50}
            alt="Bankme"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>{user && <LogoutBtn />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
