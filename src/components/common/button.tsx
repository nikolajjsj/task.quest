import React from "react";

const BASE =
  "flex items-center justify-center gap-2 py-2 px-6 focus:outline-none rounded border font-semibold cursor-pointer";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ children, className, onClick, ...props }: Props) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${BASE} text-white bg-indigo-500 hover:bg-indigo-600 ${className}`}
    >
      {children}
    </button>
  );
};

export const GhostButton = ({
  children,
  className,
  onClick,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${BASE} text-slate-900 bg-white hover:bg-slate-50 ${className}`}
    >
      {children}
    </button>
  );
};

export const DeleteButton = ({
  children,
  className,
  onClick,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${BASE} text-white bg-red-500 hover:bg-red-400 ${className}`}
    >
      {children}
    </button>
  );
};
