import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "white"
  | "success"
  | "delete"
  | "navbar"
  | "ghost";

type Props = { variant?: ButtonVariant } & React.HTMLProps<HTMLButtonElement>;
export const Button = ({ children, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ${className}`}
    >
      {children}
    </button>
  );
};
