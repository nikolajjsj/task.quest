import type { NextPage } from "next";
import { FeatureCard } from "../components/app/FeatureCard";
import { AppTitle, Span } from "../components/common/text";
import { SCREEN_XL, styled } from "../styles/stitches.config";

const Home: NextPage = () => {
  return (
    <s.Home>
      <AppTitle>
        Task<Span css={{ color: "Grey" }}>.query</Span>
      </AppTitle>

      <s.Features>
        <FeatureCard
          href="/pomodoro"
          title="Pomodoro"
          backgroundColor="#2196f3"
        />

        <FeatureCard
          href="/projects"
          title="Projects"
          backgroundColor="#009688"
        />
      </s.Features>
    </s.Home>
  );
};
export default Home;

namespace s {
  export const Home = styled("div", {
    flex: "auto",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "$8",
  });

  export const Features = styled("div", {
    width: "95%",
    maxWidth: SCREEN_XL,
    margin: "0 auto",
    display: "grid",
    placeContent: "center",
    gap: "$4",
    gridTemplateColumns: "1fr",

    "@sm": {
      width: "90%",
      gridTemplateColumns: "1fr 1fr",
    },

    "@lg": {
      width: "80%",
      // gridTemplateColumns: "1fr 1fr 1fr",
    },
  });
}
