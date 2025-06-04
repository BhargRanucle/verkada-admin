"use client"

import { motion } from "framer-motion"

interface PageTitleProps {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
      <h1 className="text-3xl font-bold tracking-tight gradient-text">{title}</h1>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </motion.div>
  )
}
