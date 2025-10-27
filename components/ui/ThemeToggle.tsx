"use client";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button onClick={toggleTheme} variant="ghost" aria-label="Toggle Theme">
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
}
