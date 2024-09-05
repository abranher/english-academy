import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";

import CourseSidebar from "./CourseSidebar";
import { Course } from "@/types/models/Course";
import { Chapter } from "@/types/models/Chapter";
import { StudentProgress } from "@/types/models/StudentProgress";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: StudentProgress[] | null;
    })[];
  };
  progressCount: number;
}

export default function CourseMobileSidebar({
  course,
  progressCount,
}: CourseMobileSidebarProps) {
  return (
    <>
      <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
          <CourseSidebar course={course} progressCount={progressCount} />
        </SheetContent>
      </Sheet>
    </>
  );
}
