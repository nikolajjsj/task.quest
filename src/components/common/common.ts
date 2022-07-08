import { SCREEN_MD, styled } from "../../styles/stitches.config";

export const AppTitle = styled("h1", {
  fontSize: "$4xl",
  fontWeight: 700,
  letterSpacing: "$wider",
});

export const Span = styled("span", {});

export const Hr = styled("hr", {
  width: "90%",
  margin: "0 auto",
});

export const Button = styled("button", {
  border: "1px solid transparent",
  height: "fit-content",
  width: "fit-content",
  borderRadius: "$lg",
  cursor: "pointer",
  boxShadow: "$lg",

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

export const Card = styled("div", {
  flex: "auto",
  width: "100%",
  maxWidth: SCREEN_MD,
  borderRadius: "$lg",
  boxShadow: "$lg",
  border: "1px solid grey",
  padding: "$4",
});

export const Spacer = styled("div", {
  variants: {
    x: {
      auto: { marginLeft: "auto" },
      "0-5": { width: "$space$0-5" },
      "1": { width: "$space$1" },
      "1-5": { width: "$space$1-5" },
      "2": { width: "$space$2" },
      "2-5": { width: "$space$2-5" },
      "3": { width: "$space$3" },
      "3-5": { width: "$space$3-5" },
      "4": { width: "$space$4" },
      "5": { width: "$space$5" },
      "6": { width: "$space$6" },
      "7": { width: "$space$7" },
      "8": { width: "$space$8" },
      "9": { width: "$space$9" },
      "10": { width: "$space$10" },
      "11": { width: "$space$11" },
      "12": { width: "$space$12" },
      "14": { width: "$space$14" },
      "16": { width: "$space$16" },
      "20": { width: "$space$20" },
      "24": { width: "$space$24" },
      "28": { width: "$space$28" },
      "32": { width: "$space$32" },
      "36": { width: "$space$36" },
      "40": { width: "$space$40" },
      "44": { width: "$space$44" },
      "48": { width: "$space$48" },
      "52": { width: "$space$52" },
      "56": { width: "$space$56" },
      "60": { width: "$space$60" },
      "64": { width: "$space$64" },
      "72": { width: "$space$72" },
      "80": { width: "$space$80" },
      "96": { width: "$space$96" },
    },
    y: {
      auto: { marginTop: "auto" },
      "0-5": { height: "$space$0-5" },
      "1": { height: "$space$1" },
      "1-5": { height: "$space$1-5" },
      "2": { height: "$space$2" },
      "2-5": { height: "$space$2-5" },
      "3": { height: "$space$3" },
      "3-5": { height: "$space$3-5" },
      "4": { height: "$space$4" },
      "5": { height: "$space$5" },
      "6": { height: "$space$6" },
      "7": { height: "$space$7" },
      "8": { height: "$space$8" },
      "9": { height: "$space$9" },
      "10": { height: "$space$10" },
      "11": { height: "$space$11" },
      "12": { height: "$space$12" },
      "14": { height: "$space$14" },
      "16": { height: "$space$16" },
      "20": { height: "$space$20" },
      "24": { height: "$space$24" },
      "28": { height: "$space$28" },
      "32": { height: "$space$32" },
      "36": { height: "$space$36" },
      "40": { height: "$space$40" },
      "44": { height: "$space$44" },
      "48": { height: "$space$48" },
      "52": { height: "$space$52" },
      "56": { height: "$space$56" },
      "60": { height: "$space$60" },
      "64": { height: "$space$64" },
      "72": { height: "$space$72" },
      "80": { height: "$space$80" },
      "96": { height: "$space$96" },
    },
  },
});
