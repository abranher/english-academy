"use client";

import { usePathname } from "next/navigation";

import { Nav } from "@/components/settings/nav";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/shadcn/ui/separator";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            href: "#",
            title: "Inbox",
            icon: Inbox,
            variant: "default",
          },
          {
            href: "#",
            title: "Drafts",
            icon: File,
            variant: "ghost",
          },
          {
            href: "#",
            title: "Sent",
            icon: Send,
            variant: "ghost",
          },
          {
            href: "#",
            title: "Junk",
            icon: ArchiveX,
            variant: "ghost",
          },
          {
            href: "#",
            title: "Trash",
            icon: Trash2,
            variant: "ghost",
          },
          {
            href: "#",
            title: "Archive",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            href: "#",
            title: "Social",
            icon: Users2,
            variant: "ghost",
          },
          {
            href: "#",
            title: "Updates",
            icon: AlertCircle,
            variant: "ghost",
          },
          {
            href: "#",
            title: "Forums",
            icon: MessagesSquare,
            variant: "ghost",
          },
          {
            href: "#",
            title: "Shopping",
            icon: ShoppingCart,
            variant: "ghost",
          },
          {
            href: "#",
            title: "Promotions",
            icon: Archive,
            variant: "ghost",
          },
        ]}
      />
    </>
  );
}
