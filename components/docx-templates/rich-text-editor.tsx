"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Link } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  height = 150,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const insertList = (ordered: boolean) => {
    const command = ordered ? "insertOrderedList" : "insertUnorderedList"
    execCommand(command)
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  return (
    <div className="border border-black/20 rounded-md">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-black/20 bg-gray-50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-black/10"
          onClick={() => execCommand("bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-black/10"
          onClick={() => execCommand("italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-black/20 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-black/10"
          onClick={() => insertList(false)}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-black/10"
          onClick={() => insertList(true)}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-black/10" onClick={insertLink}>
          <Link className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-black/20 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs hover:bg-black/10"
          onClick={() => execCommand("formatBlock", "h3")}
        >
          H3
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs hover:bg-black/10"
          onClick={() => execCommand("formatBlock", "p")}
        >
          P
        </Button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="p-3 outline-none min-h-[120px] prose prose-sm max-w-none"
        style={{ height: `${height}px`, overflowY: "auto" }}
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
