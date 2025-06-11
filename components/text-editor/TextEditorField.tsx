import React, { useEffect, useState } from "react";
import { Field, ErrorMessage } from "formik";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.core.css";
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css";
// import ReactQuill from "react-quill-new";
// import "react-quill/dist/quill.snow.css";

interface TextEditorFieldProps {
  name: string;
  toolbarId: string;
  value?: string;
  onChange?: (content: string) => void;
}

const TextEditorField: React.FC<TextEditorFieldProps> = ({
  name,
  toolbarId,
  value,
  onChange,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ReactQuill) {
      setIsLoaded(true);
    }
  }, []);

  const generateModules = (id: string) => ({
    toolbar: {
      container: `#${id}`,
    },
  });

  return (
    <div className="bg-white text-editor rounded-[17px]">
      <Field name={name}>
        {({ field, form }: any) => {
          const handleChange = (content: string) => {
            if (onChange) {
              onChange(content);
            } else {
              form.setFieldValue(name, content);
            }
          };

          return (
            <>
              {isLoaded && (
                <div>
                  <div id={toolbarId}>
                    
                    <button className="ql-bold" />
                   <button
                      className="ql-list"
                      value="bullet"
                      title="Bullet List"
                    />
                    <button
                      className="ql-list"
                      value="ordered"
                      title="Numbered List"
                    />
                    <button
                      className="ql-indent"
                      value="-1"
                      title="Indent Left"
                    />
                    <button
                      className="ql-indent"
                      value="+1"
                      title="Indent Right"
                    />

                    <button className="ql-link" title="Add Link" />
                  </div>
                  <ReactQuill
                    value={value ?? field.value}
                    onChange={handleChange}
                    theme="snow"
                    modules={generateModules(toolbarId)}
                  />
                </div>
              )}

              {/* <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-xs mt-1"
              /> */}
            </>
          );
        }}
      </Field>
    </div>
  );
};

export default TextEditorField;

// import React, { useState, useEffect, useRef } from "react";
// import { Field } from "formik";

// interface TextEditorFieldProps {
//   name: string;
//   value?: string;
//   onChange?: (content: string) => void;
// }

// const TextEditorField: React.FC<TextEditorFieldProps> = ({
//   name,
//   value,
//   onChange,
// }) => {
//   const editorRef = useRef<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [editorData, setEditorData] = useState(value || "");

//   useEffect(() => {
//     // Load CKEditor only on client-side
//     const initializeEditor = async () => {
//       if (typeof window !== "undefined") {
//         try {
//           // Dynamically import CKEditor components
//           const { CKEditor } = await import("@ckeditor/ckeditor5-react");
//           const ClassicEditor = (await import("@ckeditor/ckeditor5-build-classic")).default;

//           // Store editor components in ref
//           editorRef.current = { CKEditor, ClassicEditor };
//           setIsLoading(false);
//         } catch (error) {
//           console.error("Failed to load CKEditor:", error);
//         }
//       }
//     };

//     initializeEditor();
//   }, []);

//   const handleChange = (event: any, editor: any) => {
//     const content = editor.getData();
//     setEditorData(content);
//     onChange?.(content);
//   };

//   const editorConfiguration = {
//     licenseKey: "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTA0NjM5OTksImp0aSI6ImRhY2IwMjllLTZhYWMtNGY5Ni05NGJjLTY5MzkzODMzODBmZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijk3ZTQ3MGM2In0.seZ7bNWzNL7izyM_L9BALyQX-LT5AM0gs2mvWErDICWv1l5RA5cyZhqxP3duUxAf1pfXFXHx7WN9qTSTh2O5MA",
//     toolbar: [
//       "heading",
//       "|",
//       "bold",
//       "italic",
//       "underline",
//       "|",
//       "bulletedList",
//       "numberedList",
//       "|",
//       "alignment",
//       "indent",
//       "outdent",
//       "|",
//       "undo",
//       "redo",
//     ],
//     list: {
//       properties: {
//         styles: true,
//         startIndex: true,
//         reversed: true,
//       },
//     },
//     numberedList: {
//     styles: ["default", "lower-alpha", "upper-alpha", "lower-roman", "upper-roman"],
//   },
//   };

//   return (
//     <div className="bg-white text-editor rounded-[17px] p-4 shadow-sm">
//       <Field name={name}>
//         {({ field, form }: any) => {
//           // Update form value when editor data changes
//           useEffect(() => {
//             form.setFieldValue(name, editorData);
//           }, [editorData, name]);

//           if (isLoading || !editorRef.current) {
//             return (
//               <div className="min-h-[200px] flex items-center justify-center text-gray-500">
//                 Loading editor...
//               </div>
//             );
//           }

//           const { CKEditor, ClassicEditor } = editorRef.current;

//           return (
//             <CKEditor
//               editor={ClassicEditor}
//               config={editorConfiguration}
//               data={editorData}
//               onChange={(event: any, editor: any) => {
//                 handleChange(event, editor);
//               }}
//             />
//           );
//         }}
//       </Field>
//     </div>
//   );
// };

// export default TextEditorField;

// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Field } from "formik";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic, IconNumberedList } from "ckeditor5";
// import { FormatPainter } from "ckeditor5-premium-features";

// import "ckeditor5/ckeditor5.css";
// import "ckeditor5-premium-features/ckeditor5-premium-features.css";

// interface TextEditorFieldProps {
//   name: string;
//   value?: string;
//   onChange?: (content: string) => void;
// }

// const TextEditorField: React.FC<TextEditorFieldProps> = ({
//   name,
//   value,
//   onChange,
// }) => {
//   const handleChange = (event: any, editor: any) => {
//     const content = editor.getData();
//     onChange?.(content);
//   };

//   const editorConfiguration = {
//     licenseKey: "your-license-key",
//     toolbar: [
//       "heading",
//       "|",
//       "bold",
//       "italic",
//       "underline",
//       "|",
//       "bulletedList",
//       "numberedList",
//       "|",
//       "alignment",
//       "indent",
//       "outdent",
//       "|",
//       "undo",
//       "redo",
//     ],
//     list: {
//       properties: {
//         styles: true,
//         startIndex: true,
//         reversed: true,
//       },
//     },
//     numberedList: {
//       styles: [
//         "default",
//         "lower-alpha",
//         "upper-alpha",
//         "lower-roman",
//         "upper-roman",
//       ],
//     },
//   };

//   return (
//     <div className="bg-white text-editor rounded-[17px] p-4 shadow-sm">
//       <Field name={name}>
//         {({ field, form }: any) => {
//           return (
//             <CKEditor
//               editor={ClassicEditor}
//               config={{
//                 licenseKey: "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTA0NjM5OTksImp0aSI6ImRhY2IwMjllLTZhYWMtNGY5Ni05NGJjLTY5MzkzODMzODBmZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijk3ZTQ3MGM2In0.seZ7bNWzNL7izyM_L9BALyQX-LT5AM0gs2mvWErDICWv1l5RA5cyZhqxP3duUxAf1pfXFXHx7WN9qTSTh2O5MA", // Or 'GPL'.
//                 plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
//                 toolbar: [
//                   "undo",
//                   "redo",
//                   "|",
//                   "bold",
//                   "italic",
//                   "|",
//                   "formatPainter",
//                 ],
//                 initialData: "<p>Hello from CKEditor 5 in React!</p>",
//               }}
//             />
//           );
//         }}
//       </Field>
//     </div>
//   );
// };

// export default TextEditorField;

