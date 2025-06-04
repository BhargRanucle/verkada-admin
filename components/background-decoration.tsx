"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function BackgroundDecoration() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Top right blob */}
      <div
        className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 blur-3xl"
        style={{ animationDelay: "0s" }}
      />

      {/* Bottom left blob */}
      <div
        className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-primary/5 to-primary/10 blur-3xl"
        style={{ animationDelay: "2s" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"
        style={{
          backgroundSize: "30px 30px",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='${
            isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"
          }'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
