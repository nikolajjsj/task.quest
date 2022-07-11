import { SCREEN_MD, styled } from "../../styles/stitches.config";

export const Card = styled("div", {
  flex: "auto",
  width: "100%",
  maxWidth: SCREEN_MD,
  borderRadius: "$lg",
  boxShadow: "$lg",
  border: "1px solid grey",
  padding: "$4",
});
