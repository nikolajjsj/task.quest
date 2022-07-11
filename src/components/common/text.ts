import { styled } from "../../styles/stitches.config";

export const AppTitle = styled("h1", {
  fontSize: "$2xl",
  fontWeight: 700,
  letterSpacing: "$wider",

  "@md": {
    fontSize: "$4xl",
  },
});

export const Title = styled("h3", {
  fontSize: "$lg",
  fontWeight: 600,

  "@md": {
    fontSize: "$xl",
  },
});

export const Description = styled("p", {
  color: "Grey",
});

export const Span = styled("span", {});

export const Error = styled("p", {
  color: "$danger",
  fontSize: "$sm",
});
