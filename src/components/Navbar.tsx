import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { rem, styled } from "../styles/stitches.config";
import { Button, Spacer } from "./common/common";

export const Navbar = () => {
  return (
    <s.Navbar>
      <Link href="/">
        <Button variant="navbar" size="sm">
          <s.Icon as={HiHome} />
        </Button>
      </Link>

      <Spacer y="auto" />

      <Link href="/auth">
        <Button variant="navbar" size="sm">
          <s.Icon as={FaUserCircle} />
        </Button>
      </Link>

      <Link href="/settings">
        <Button variant="navbar" size="sm">
          <s.Icon as={IoIosSettings} />
        </Button>
      </Link>
    </s.Navbar>
  );
};

namespace s {
  export const Navbar = styled("nav", {
    position: "sticky",
    top: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    background: "$black",
    padding: "$1",
    gap: "$2",

    "@md": {
      padding: "$2",
    },
  });

  export const Title = styled("h1", {
    fontSize: "$xl",
    fontWeight: 700,
    letterSpacing: "$wider",

    "@md": {
      fontSize: "$2xl",
    },
  });

  export const Icon = styled("svg", {
    height: rem(16),
    width: rem(16),
    color: "$white",

    "@md": {
      height: rem(24),
      width: rem(24),
    },
  });

  // export const Link = styled("a", {
  //   display: "flex",
  //   alignItems: "center",
  //   gap: "$4",
  //   background: "transparent",
  //   color: "$white",
  //   borderRadius: "$lg",
  //   padding: "$2 $4",
  //   margin: "$1",
  //   textDecoration: "none",
  //   transition: ".2s",
  //   cursor: "pointer",
  // });
}
