import type { NextPage } from "next";
import { styled } from "../styles/stitches.config";

const Home: NextPage = () => {
  return (
    <s.Home>
      hello
      <p>hello</p>
    </s.Home>
  );
};
export default Home;

namespace s {
  export const Home = styled("div", {
    flex: "auto",
    display: "flex",
  });
}
