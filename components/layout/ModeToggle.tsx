/**
 * @file ModeToggle.tsx
 * @description Dark/light mode toggle button using next-themes and shadcn Button.
 * Cycles: system → light → dark → system using the Sun / Moon icons from lucide-react.
 */

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Props for the {@link ModeToggle} component. */
export interface Props {
  /** Additional class names to merge onto the button. */
  className?: string;
}

/**
 * Icon button that toggles between light and dark themes.
 * Renders nothing on the server to avoid hydration mismatch (SSG-safe).
 *
 * @param props - {@link Props}
 * @returns A shadcn ghost icon Button that toggles the theme.
 *
 * @example
 * <ModeToggle />
 */
export function ModeToggle({ className }: Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`px-2 py-2 ${className ?? ""}`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <Sun className="size-5" aria-hidden="true" />
      ) : (
        <Moon className="size-5" aria-hidden="true" />
      )}
    </Button>
  );
}
