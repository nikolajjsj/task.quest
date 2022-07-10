import type { NextPage } from "next";
import Link from "next/link";
import { AppTitle, Card, Span } from "../components/common/common";
import { SCREEN_XL, styled } from "../styles/stitches.config";

const Home: NextPage = () => {
  return (
    <s.Home>
      <AppTitle>
        Task<Span css={{ color: "Grey" }}>.query</Span>
      </AppTitle>

      <s.Features>
        <Link href="/pomodoro">
          <s.FeatureLink css={{ background: "#2196f3", color: "$white" }}>
            Pomodoro
          </s.FeatureLink>
        </Link>

        <Link href="/projects">
          <s.FeatureLink css={{ background: "#009688", color: "$white" }}>
            Projects
          </s.FeatureLink>
        </Link>
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

  export const FeatureLink = styled(Card, {
    boxShadow: "$xl",
    padding: "$8",
    textTransform: "uppercase",
    fontWeight: 700,
    letterSpacing: "$wider",
    fontSize: "$4xl",
  });
}
