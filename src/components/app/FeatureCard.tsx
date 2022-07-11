import Link from "next/link";
import { styled } from "../../styles/stitches.config";
import { Card } from "../common/card";

type Props = {
  title: string;
  href: string;
  backgroundColor: string;
};

export const FeatureCard = ({ title, href, backgroundColor }: Props) => {
  return (
    <Link href={href}>
      <s.FeatureLink css={{ backgroundColor }}>{title}</s.FeatureLink>
    </Link>
  );
};

namespace s {
  export const FeatureLink = styled(Card, {
    cursor: "pointer",
    boxShadow: "$xl",
    padding: "$12 $8",
    textTransform: "uppercase",
    fontWeight: 700,
    letterSpacing: "$wider",
    fontSize: "$4xl",
    color: "$white",
  });
}
