import { styled } from "../../styles/stitches.config";

const Settings = () => {
  return (
    <s.Settings>
      <p>Settings</p>
    </s.Settings>
  );
};
export default Settings;

namespace s {
  export const Settings = styled("div", {
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingInline: "$4",
  });
}
