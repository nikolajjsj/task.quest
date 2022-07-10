import { styled } from "../../styles/stitches.config";

const Pomodoro = () => {
  return (
    <s.Pomodoro>
      <p>Pomodoro</p>
    </s.Pomodoro>
  );
};
export default Pomodoro;

namespace s {
  export const Pomodoro = styled("div", {
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingInline: "$4",
  });
}
