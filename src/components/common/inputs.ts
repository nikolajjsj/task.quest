import { styled } from "../../styles/stitches.config";

const BORDER_RADIUS = "$lg";
const BORDER = "1px solid grey";
const PADDING = "$3 $4";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "$4",
});

export const InputGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1",
});

export const Label = styled("label", {
  flex: "auto",
  fontWeight: 600,
});

export const Input = styled("input", {
  flex: "auto",
  padding: PADDING,
  background: "$white",
  border: BORDER,
  borderRadius: BORDER_RADIUS,
});

export const TextArea = styled("textarea", {
  flex: "auto",
  padding: PADDING,
  background: "$white",
  border: BORDER,
  borderRadius: BORDER_RADIUS,
});
