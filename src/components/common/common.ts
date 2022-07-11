import { styled } from "../../styles/stitches.config";

export const Flex = styled("div", {
  display: "flex",

  variants: {
    flow: {
      row: { flexDirection: "row" },
      col: { flexDirection: "column" },
    },
    gap: {
      0: { gap: "$0" },
      1: { gap: "$1" },
      2: { gap: "$2" },
      3: { gap: "$3" },
      4: { gap: "$4" },
    },
  },
  defaultVariants: {
    flow: "row",
    gap: 0,
  },
});
