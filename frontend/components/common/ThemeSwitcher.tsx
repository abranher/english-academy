"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/shadcn/ui/button";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme === "light" ? (
        <>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            type="button"
            onClick={() => {
              setTheme("dark");
            }}
          >
            <SunIcon />
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            type="button"
            onClick={() => {
              setTheme("light");
            }}
          >
            <MoonIcon />
          </Button>
        </>
      )}
    </>
  );
}
