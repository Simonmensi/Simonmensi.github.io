/**
 * @file ThemeProvider.tsx
 * @description Wraps the application with next-themes ThemeProvider so that
 * the `dark` class is applied on `<html>` when dark mode is active.
 * Must be a Client Component because next-themes uses React context.
 */

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/** Props forwarded directly to next-themes ThemeProvider. */
export type Props = ComponentProps<typeof NextThemesProvider>;

/**
 * Thin "use client" wrapper around next-themes ThemeProvider.
 *
 * @param props - All next-themes ThemeProvider props.
 * @returns ThemeProvider context wrapping children.
 *
 * @example
 * <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
 *   {children}
 * </ThemeProvider>
 */
export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
