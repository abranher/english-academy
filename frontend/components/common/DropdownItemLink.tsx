import Link from "next/link";
import { DropdownMenuItem } from "../shadcn/ui/dropdown-menu";
import { LucideIcon } from "lucide-react";

export default function DropdownItemLink({
  href,
  Icon,
  title,
}: {
  title: string;
  Icon: LucideIcon;
  href: string;
}) {
  return (
    <>
      <Link href={href}>
        <DropdownMenuItem>
          <Icon className="mr-2 h-4 w-4" />
          {title}
        </DropdownMenuItem>
      </Link>
    </>
  );
}
