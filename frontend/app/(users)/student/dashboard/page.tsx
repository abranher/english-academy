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
import { useState } from "react";
import { motion } from "framer-motion";

export default function StudentDashboardPage() {
  //const { completedCourses, coursesInProgress } = getDashboardCourses("");

  const { data: session } = useSession();
  const [selectedId, setSelectedId] = useState(null);
  const items = [
    {
      id: "askjr23",
      title: "titulo",
      subtitle: "sun titulo",
    },
  ];

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[1200px]">
          <div>
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <Sidebar playlists={playlists} className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-4 p-6">
                  <CoursesList />

                  {items.map((item) => (
                    <motion.div
                      layoutId={item.id}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <motion.h5>{item.subtitle}</motion.h5>
                      <motion.h2>{item.title}</motion.h2>
                    </motion.div>
                  ))}

                  <AnimatePresence>
                    {selectedId && (
                      <motion.div layoutId={selectedId}>
                        <motion.h5>{item.subtitle}</motion.h5>
                        <motion.h2>{item.title}</motion.h2>
                        <motion.button onClick={() => setSelectedId(null)} />
                      </motion.div>
                    )}
                  </AnimatePresence>
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
