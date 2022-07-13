import type { NextPage } from "next";
import { FeatureCard } from "../components/app/FeatureCard";
import { Spacer } from "../components/common/spacer";
import { AppTitle, Span } from "../components/common/text";
import { SCREEN_XL, styled } from "../styles/stitches.config";

const Home: NextPage = () => {
  return (
    <s.Home>
      <Spacer y={12} />

      <AppTitle>
        Task<Span css={{ color: "Grey" }}>.quest</Span>
      </AppTitle>

      <Spacer y={12} />

      <s.Features>
        <FeatureCard
          href="/pomodoro"
          title="Pomodoro"
          backgroundColor="#00CECB"
        />

        <FeatureCard
          href="/projects"
          title="Projects"
          backgroundColor="#FF5E5B"
        />

        <FeatureCard href="/tasks" title="Tasks" backgroundColor="#457b9d" />
      </s.Features>

      <Spacer y={40} />
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
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  });
}
