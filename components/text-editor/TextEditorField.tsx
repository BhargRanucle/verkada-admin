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
                    <select className="ql-header">
                      <option value="1">Heading 1</option>
                      <option value="2">Heading 2</option>
                    </select>
                    <button className="ql-bold" />
                    <button
                      className="ql-list"
                      value="bullet"
                      title="Bullet List"
                    />
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
