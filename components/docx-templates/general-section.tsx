"use client";

import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import "react-quill-new/dist/quill.core.css"; 
import "react-quill-new/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css"; 
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface GeneralSectionProps {
  index: any;
  remove: (index: any) => void;
  showRemove: boolean;
  arrayLength: any;
}

export default function GeneralSection({
  index,
  remove,
  showRemove,
  arrayLength,
}: GeneralSectionProps) {
  const modules = {
    toolbar: {
      container: `#toolbar-${index}`,
    },
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (ReactQuill) {
      setIsLoaded(true);
    }
  }, [ReactQuill]);

  return (
    <>
      <Card
        key={`general_${index}`}
        className="border border-black/10 hover:border-black/20 transition-all duration-200 bg-white/80 backdrop-blur-sm"
      >
        <CardContent className="p-3 space-y-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor={`generalSections.${index}.title`}
              className="font-semibold text-sm text-gray-700"
            >
              Title
            </Label>
            {showRemove && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  remove(index);
                }}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>

          <Field name={`generalSections.${index}.title`}>
            {({ field, meta }: any) => (
              <div>
                <Input
                  {...field}
                  id={`generalSections.${index}.title`}
                  placeholder="Enter title"
                  className={`h-8 text-sm border-black/20 focus-visible:ring-black/50 bg-white text-gray-900 placeholder:text-gray-400 ${
                    meta.touched && meta.error ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name={`generalSections.${index}.title`}
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            )}
          </Field>

          <div className="text-editor">
            <Label
              htmlFor={`generalSections.${index}.content`}
              className="font-semibold text-sm text-gray-700"
            >
              Content
            </Label>
            <div className="mt-1">
              <Field name={`generalSections.${index}.content`}>
                {({ field, form, meta }: any) => (
                  <div>
                    {isLoaded && (
                      <div>
                        <div id={`toolbar-${index}`}>
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
                          value={field.value}
                          onChange={(content) =>
                            form.setFieldValue(field.name, content)
                          }
                          theme="snow"
                          modules={modules}
                          key={field.name}
                        />
                      </div>
                    )}

                    <ErrorMessage
                      name={`generalSections.${index}.content`}
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                )}
              </Field>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
