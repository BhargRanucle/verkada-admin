"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Use react-quill-new which is React 18 compatible
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <div className="h-24 bg-gray-50 border border-black/20 rounded-md animate-pulse" />,
})

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
}

export default function QuillEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  height = 100,
}: QuillEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const modules = {
    toolbar: [
      [{ header: [3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  }

  // Fixed formats - using correct Quill format names
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list", // This covers both ordered and bullet lists
    "link",
  ]

  if (!mounted) {
    return <div className="h-24 bg-gray-50 border border-black/20 rounded-md animate-pulse" />
  }

  return (
    <div className="quill-wrapper">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{
          height: `${height}px`,
        }}
      />
      <div className="h-10" /> {/* Spacer for toolbar */}
      <style jsx global>{`
        .quill-wrapper .ql-toolbar {
          border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-left: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-bottom: none !important;
          background: #f9fafb !important;
          border-radius: 6px 6px 0 0 !important;
          padding: 4px 8px !important;
        }

        .quill-wrapper .ql-container {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-left: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
          border-top: none !important;
          border-radius: 0 0 6px 6px !important;
          font-size: 14px !important;
        }

        .quill-wrapper .ql-editor {
          padding: 8px 12px !important;
          min-height: ${height - 42}px !important;
          font-size: 14px !important;
          line-height: 1.4 !important;
          color: #374151 !important;
        }

        .quill-wrapper .ql-toolbar .ql-formats {
          margin-right: 8px !important;
        }

        .quill-wrapper .ql-toolbar button {
          padding: 2px 4px !important;
          margin: 0 1px !important;
          border-radius: 3px !important;
        }

        .quill-wrapper .ql-toolbar button:hover {
          background: rgba(0, 0, 0, 0.1) !important;
        }

        .quill-wrapper .ql-toolbar button.ql-active {
          background: rgba(0, 0, 0, 0.15) !important;
          color: #000 !important;
        }

        .quill-wrapper .ql-editor.ql-blank::before {
          color: #9ca3af !important;
          font-style: italic !important;
        }

        .quill-wrapper .ql-editor h3 {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          margin: 0.5rem 0 !important;
          color: #111827 !important;
        }

        .quill-wrapper .ql-editor p {
          margin: 0.25rem 0 !important;
        }

        .quill-wrapper .ql-editor ul, .quill-wrapper .ql-editor ol {
          margin: 0.5rem 0 !important;
          padding-left: 1.5rem !important;
        }

        .quill-wrapper .ql-editor li {
          margin: 0.25rem 0 !important;
        }

        .quill-wrapper .ql-editor a {
          color: #2563eb !important;
          text-decoration: underline !important;
        }

        .quill-wrapper .ql-editor strong {
          font-weight: 600 !important;
          color: #111827 !important;
        }

        .quill-wrapper .ql-editor em {
          font-style: italic !important;
        }

        .quill-wrapper .ql-editor u {
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  )
}
