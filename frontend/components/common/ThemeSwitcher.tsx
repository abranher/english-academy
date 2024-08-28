"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (e: any) => {
    const newTheme = e.target.checked ? "light" : "dark";
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <>
      <Switch
        size="lg"
        color="success"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        onChange={handleThemeChange}
      />
    </>
  );
}
