import React from "react";

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
    <div {...props} className="flex flex-col gap-1">
      {children}
    </div>
  );
};

type LabelProps = React.HTMLProps<HTMLLabelElement>;
export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label {...props} className="flex-auto font-semibold">
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
