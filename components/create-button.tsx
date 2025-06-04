import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface CreateButtonProps {
  href: string
  label: string
}

export function CreateButton({ href, label }: CreateButtonProps) {
  return (
    <Button
      asChild
      className="rounded-xl from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
    >
      <Link href={href} className="gap-2">
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">Add</span>
      </Link>
    </Button>
  )
}
