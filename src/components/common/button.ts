import { styled } from "../../styles/stitches.config";

export const Button = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$2",
  border: "1px solid transparent",
  height: "fit-content",
  borderRadius: "$lg",
  cursor: "pointer",
  boxShadow: "$lg",
  fontSize: "$base",
  fontWeight: 600,

  variants: {
    variant: {
      primary: {
        background: "$primary-500",
        color: "$white",
        border: "1px solid $white",
      },
      secondary: {
        background: "$secondary-500",
        color: "$white",
        border: "1px solid $white",
      },
      white: {
        background: "$white",
        color: "$black",
        border: "1px solid $black",

        "&:hover": {
          background: "none rgba(0, 0, 0, 0.1)",
        },
      },
      success: {
        background: "$success",
        color: "$white",
        border: "1px solid $white",
      },
      delete: {
        background: "$danger",
        color: "$white",
        border: "1px solid $white",
      },
      navbar: {
        background: "transparent",

        "&:hover": {
          background: "$black",
        },
      },
      ghost: {
        background: "transparent",

        "&:hover": {
          background: "none rgba(0, 0, 0, 0.1)",
        },
      },
    },

    size: {
      base: {
        paddingBlock: "$3",
        paddingInline: "$4",
      },
      sm: {
        paddingBlock: "$2",
        paddingInline: "$3",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "base",
  },
});
