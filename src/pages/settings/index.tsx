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
    display: "flex",
    flexDirection: "column",
    paddingInline: "$4",
  });
}
