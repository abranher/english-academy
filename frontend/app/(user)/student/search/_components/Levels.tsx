"use client";

import { Level } from "@/types/models/Level";
import React from "react";
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";
import LevelItem from "./LevelItem";

interface LevelsProps {
  items: Level[];
}

const iconMap: Record<Level["title"], IconType> = {
  'Listening': FcMusic,
  'Speaking': FcOldTimeCamera,
  'Reading': FcSportsMode,
  'Writing': FcSalesPerformance,
  'Gramática': FcMultipleDevices,
  'Vocabulario': FcFilmReel,
};

export default function Levels({ items }: LevelsProps) {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <LevelItem
          key={item.id}
          label={item.title}
          icon={iconMap[item.title]}
          value={item.id}
        />
      ))}
    </div>
  );
}
