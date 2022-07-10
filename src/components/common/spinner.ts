import { keyframes, styled } from "../../styles/stitches.config";

const loading = keyframes({
  "0%": {
    transform: "rotate(0deg)",
    webkitTransform: "rotate(0deg)",
  },
  "100%": {
    transform: "rotate(360deg)",
    webkitTransform: "rotate(360deg)",
  },
});

export const Spinner = styled("div", {
  borderRadius: "50%",
  fontSize: "10px",
  position: "relative",
  textIndent: "-9999em",
  webkitTransform: "translateZ(0)",
  msTransform: "translateZ(0)",
  transform: "translateZ(0)",
  webkitAnimation: `${loading} 1.1s infinite linear`,
  animation: `${loading} 1.1s infinite linear`,

  "&:after": {
    borderRadius: "50%",
    width: "3em",
    height: "3em",
  },

  variants: {
    color: {
      black: {
        borderTop: "0.5em solid rgba(0, 0, 0, 0.2)",
        borderRight: "0.5em solid rgba(0, 0, 0, 0.2)",
        borderBottom: "0.5em solid rgba(0, 0, 0, 0.2)",
        borderLeft: "0.5em solid #000",
      },
      white: {
        borderTop: "0.5em solid rgba(255, 255, 255, 0.2)",
        borderRight: "0.5em solid rgba(255, 255, 255, 0.2)",
        borderBottom: "0.5em solid rgba(255, 255, 255, 0.2)",
        borderLeft: "0.5em solid #fff",
      },
    },
    center: {
      true: {
        flex: "auto",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      },
    },
    size: {
      small: {
        width: "2em",
        height: "2em",
      },
      medium: {
        width: "3em",
        height: "3em",
      },
      large: {
        width: "5em",
        height: "5em",
      },
    },
  },
  defaultVariants: {
    color: "black",
    center: false,
    size: "medium",
  },
});
