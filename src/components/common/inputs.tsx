import React, { useState } from "react";

type FormProps = React.HTMLProps<HTMLFormElement>;
export const Form = ({ children, ...props }: FormProps) => {
  return (
    <form {...props} className="flex flex-col gap-4">
      {children}
    </form>
  );
};

type InputGroupProps = React.HTMLProps<HTMLDivElement>;
export const InputGroup = ({ children, ...props }: InputGroupProps) => {
  return (
    <div {...props} className={`flex flex-col gap-1 ${props.className}`}>
      {children}
    </div>
  );
};

type LabelProps = React.HTMLProps<HTMLLabelElement>;
export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label {...props} className="font-semibold">
      {children}
    </label>
  );
};

type InputProps = React.HTMLProps<HTMLInputElement>;
export const Input = React.forwardRef(function Input(
  { children, ...props }: InputProps,
  ref,
) {
  return (
    <input
      {...props}
      ref={ref as any}
      className="flex-auto py-3 px-4 bg-white border border-slate-500 rounded-lg"
    />
  );
});

type InputCheckboxProps = React.HTMLProps<HTMLInputElement>;
export const Checkbox = React.forwardRef(function Checkbox(
  { children, ...props }: InputCheckboxProps,
  ref,
) {
  return <input {...props} ref={ref as any} type="checkbox" />;
});

type TextAreaProps = React.HTMLProps<HTMLTextAreaElement>;
export const TextArea = React.forwardRef(function TextArea(
  { children, ...props }: TextAreaProps,
  ref,
) {
  return (
    <textarea
      {...props}
      ref={ref as any}
      className="flex-auto py-3 px-4 bg-white border border-slate-500 rounded-lg"
    />
  );
});

type ErrorProps = React.HTMLProps<HTMLParagraphElement>;
export const Error = React.forwardRef(function Error(
  { children, ...props }: ErrorProps,
  ref,
) {
  return (
    <p {...props} ref={ref as any} className="text-red-700">
      {children}
    </p>
  );
});

type TagsInputProps = {
  disabled?: boolean;
  initialTags?: string[];
  onChange: (tags: string[]) => void;
};
export const TagsInput = ({
  onChange,
  initialTags = [],
  disabled = false,
}: TagsInputProps) => {
  const [tags, setTags] = useState<string[]>(() => [...initialTags]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const target = e.target as any;
    const value = target.value;
    if (!value.trim()) return;
    setTags((prevTags) => {
      const newTags = [...prevTags, value];
      onChange(newTags);
      return newTags;
    });
    target.value = "";
  }

  function removeTag(index: number) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="max-w-md w-full border border-slate-500 p-2 rounded flex items-center flex-wrap gap-2">
      {tags.map((t, idx) => (
        <div key={t} className="bg-gray-200 flex flex-row rounded-lg">
          <span className="py-1 px-3 text-sm">{t}</span>

          <span
            onClick={() => (disabled ? removeTag(idx) : null)}
            className={`w-8 rounded-r-lg ${
              disabled ? "bg-gray-500" : "bg-red-500"
            } text-white overflow-hidden inline-flex justify-center items-center cursor-pointer select-none`}
          >
            &times;
          </span>
        </div>
      ))}
      <input
        type="text"
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className="bg-white flex-grow py-1 px-2 border-none outline-none select-none"
        placeholder="Insert Tags Here"
      />
    </div>
  );
};
