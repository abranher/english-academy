"use client";

import { getDashboardCourses } from "@/app/_actions/get-dashboard-courses";
import { Clock } from "lucide-react";
import InfoCard from "./_components/InfoCard";
import BoxBase from "@/components/common/BoxBase";
import { Avatar } from "@/components/shadcn/ui/avatar";
import Avvvatars from "avvvatars-react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent } from "@/components/shadcn/ui/tabs";
import { Sidebar } from "./_components/Sidebar";
import { playlists } from "./data/playlists";
import CoursesList from "./_components/CoursesList";

export default function StudentDashboardPage() {
  //const { completedCourses, coursesInProgress } = getDashboardCourses("");

  const { data: session } = useSession();

  return (
    <>
      <div className="bg-yellow-400 w-full flex items-center justify-center">
        <div className="max-w-[1536px] md:px-24 lg:px-32">
          <div className="py-12 w-full">
            <div className="w-full">
              <h2 className="font-bold text-2xl">
                Welcome back, {session?.user.name}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1200px]">
          <div>
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <Sidebar playlists={playlists} className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-4 p-6">
                  <CoursesList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <InfoCard
          icon={Clock}
          label="En progreso"
          numberOfItems={coursesInProgress.length}
        />

        <InfoCard
          icon={Clock}
          label="En progreso"
          numberOfItems={coursesInProgress.length}
          variant="success"
        /> 
      </div>
      {/*
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>*/}
    </>
  );
}
