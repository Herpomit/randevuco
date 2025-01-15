"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "lucide-react"; // Heroicons'u kullanabilirsiniz.

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mount sırasında doğru temayı görmek için kullanılır.
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-md bg-muted dark:bg-muted cursor-pointer hover:bg-gray-200 dark:hover:bg-black/20"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <MoonIcon className="h-4 w-4 " />
      ) : (
        <SunIcon className="h-4 w-4" />
      )}
    </div>
  );
}
