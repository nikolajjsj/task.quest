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
      className={
        "bg-slate-800 text-white font-bold px-3 py-1 flex justify-center items-center gap-2 border border-transparent rounded-lg cursor-pointer shadow-sm font-semibold" +
        className
      }
    >
      {children}
    </button>
  );
};

// export const Button = styled("button", {
//   variants: {
//     variant: {
//       primary: {
//         background: "$primary-500",
//         color: "$white",
//         border: "1px solid $white",
//       },
//       secondary: {
//         background: "$secondary-500",
//         color: "$white",
//         border: "1px solid $white",
//       },
//       white: {
//         background: "$white",
//         color: "$black",
//         border: "1px solid $black",

//         "&:hover": {
//           background: "none rgba(0, 0, 0, 0.1)",
//         },
//       },
//       success: {
//         background: "$success",
//         color: "$white",
//         border: "1px solid $white",
//       },
//       delete: {
//         background: "$danger",
//         color: "$white",
//         border: "1px solid $white",
//       },
//       navbar: {
//         background: "transparent",

//         "&:hover": {
//           background: "$black",
//         },
//       },
//       ghost: {
//         background: "transparent",

//         "&:hover": {
//           background: "none rgba(0, 0, 0, 0.1)",
//         },
//       },
//     },

//     size: {
//       base: {
//         paddingBlock: "$3",
//         paddingInline: "$4",
//       },
//       sm: {
//         paddingBlock: "$2",
//         paddingInline: "$3",
//       },
//     },
//   },
//   defaultVariants: {
//     variant: "primary",
//     size: "base",
//   },
// });
