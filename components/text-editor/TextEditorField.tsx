// import React, { useEffect, useState, useRef } from "react";
// import { Field, ErrorMessage } from "formik";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
// import "react-quill-new/dist/quill.core.css";
// import "react-quill-new/dist/quill.bubble.css";
// import "react-quill-new/dist/quill.snow.css";

// interface TextEditorFieldProps {
//   name: string;
//   toolbarId: string;
//   value?: string;
//   onChange?: (content: string) => void;
// }

// const TextEditorField: React.FC<TextEditorFieldProps> = ({
//   name,
//   toolbarId,
//   value,
//   onChange,
// }) => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const editorContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (ReactQuill) {
//       setIsLoaded(true);
//     }

//     // Clean up fullscreen state on unmount
//     return () => {
//       if (
//         document.fullscreenElement &&
//         editorContainerRef.current?.contains(document.fullscreenElement)
//       ) {
//         document.exitFullscreen();
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(
//         document.fullscreenElement === editorContainerRef.current
//       );
//     };

//     document.addEventListener("fullscreenchange", handleFullscreenChange);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleFullscreenChange);
//     };
//   }, []);

//   const toggleFullscreen = () => {
//     if (!editorContainerRef.current) return;

//     if (!document.fullscreenElement) {
//       editorContainerRef.current.requestFullscreen().catch((err) => {
//         console.error(`Error attempting to enable fullscreen: ${err.message}`);
//       });
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   const generateModules = (id: string) => ({
//     toolbar: {
//       container: `#${id}`,
//     },
//   });

//   return (
//     <div
//       ref={editorContainerRef}
//       className={`bg-white text-editor rounded-[17px] ${
//         isFullscreen ? "fullscreen-editor" : ""
//       }`}
//     >
//       <Field name={name}>
//         {({ field, form }: any) => {
//           const handleChange = (content: string) => {
//             if (onChange) {
//               onChange(content);
//             } else {
//               form.setFieldValue(name, content);
//             }
//           };

//           return (
//             <>
//               {isLoaded && (
//                 <div>
//                   <div id={toolbarId} className="flex items-center">
//                     <button className="ql-bold" />
//                     <button
//                       className="ql-list"
//                       value="bullet"
//                       title="Bullet List"
//                     />
//                     <button
//                       className="ql-list"
//                       value="ordered"
//                       title="Numbered List"
//                     />
//                     <button
//                       className="ql-indent"
//                       value="-1"
//                       title="Indent Left"
//                     />
//                     <button
//                       className="ql-indent"
//                       value="+1"
//                       title="Indent Right"
//                     />
//                     <button className="ql-link" title="Add Link" />

//                     <button
//                       className={`ql-fullscreen ml-auto ${
//                         isFullscreen ? "active" : ""
//                       }`}
//                       title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
//                       onClick={toggleFullscreen}
//                     >
//                       {isFullscreen ? (
//                         <svg viewBox="0 0 24 24" width="16" height="16">
//                           <path
//                             fill="currentColor"
//                             d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
//                           />
//                         </svg>
//                       ) : (
//                         <svg viewBox="0 0 24 24" width="16" height="16">
//                           <path
//                             fill="currentColor"
//                             d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                   <ReactQuill
//                     value={value ?? field.value}
//                     onChange={handleChange}
//                     theme="snow"
//                     modules={generateModules(toolbarId)}
//                   />
//                 </div>
//               )}
//             </>
//           );
//         }}
//       </Field>
//     </div>
//   );
// };

// export default TextEditorField;


import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.core.css";
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css";

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ReactQuill) {
      setIsLoaded(true);
    }

    return () => {
      if (
        document.fullscreenElement &&
        editorContainerRef.current?.contains(document.fullscreenElement)
      ) {
        document.exitFullscreen();
      }
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === editorContainerRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!editorContainerRef.current) return;

    if (!document.fullscreenElement) {
      editorContainerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const generateModules = (id: string) => ({
    toolbar: {
      container: `#${id}`,
    },
  });

  return (
    <div
      ref={editorContainerRef}
      className={`bg-white text-editor rounded-[17px] ${
        isFullscreen ? "fullscreen-editor" : ""
      }`}
    >
      {isLoaded && (
        <div>
          <div id={toolbarId} className="flex items-center">
            <button className="ql-bold" />
            <button className="ql-list" value="bullet" title="Bullet List" />
            <button className="ql-list" value="ordered" title="Numbered List" />
            <button className="ql-indent" value="-1" title="Indent Left" />
            <button className="ql-indent" value="+1" title="Indent Right" />
            <button className="ql-link" title="Add Link" />

            <button
              className={`ql-fullscreen ml-auto ${
                isFullscreen ? "active" : ""
              }`}
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <path
                    fill="currentColor"
                    d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
                  />
                </svg>
              )}
            </button>
          </div>
          <ReactQuill
            value={value || ""}
            onChange={(content) => onChange?.(content)}
            theme="snow"
            modules={generateModules(toolbarId)}
          />
        </div>
      )}
    </div>
  );
};

export default TextEditorField;