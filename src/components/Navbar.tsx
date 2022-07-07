import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiHome, HiMenuAlt2, HiMenuAlt3 } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";
import { useWindowSize } from "../hooks/useWindowSize";
import { rem, SCREEN_MD, styled } from "../styles/stitches.config";
import { Button, Hr, Spacer } from "./common/common";

export const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(true);
  const size = useWindowSize();

  useEffect(() => {
    setOpen(size.width > SCREEN_MD);
  }, [size.width]);

  return (
    <s.Navbar desktop={open}>
      <s.NavbarHeader>
        {open && <s.NavbarTitle>Wanna Do</s.NavbarTitle>}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen((opened) => !opened)}
        >
          <s.Icon as={open ? HiMenuAlt2 : HiMenuAlt3} />
        </Button>
      </s.NavbarHeader>

      <Link href="/auth">
        <s.Link>
          <s.Icon as={FaUserCircle} />
          {open ? (
            <s.LinkText>{session ? "User" : "Sign In"}</s.LinkText>
          ) : null}
        </s.Link>
      </Link>

      <Hr />

      <Link href="/">
        <s.Link>
          <s.Icon as={HiHome} />
          {open ? <s.LinkText>Home</s.LinkText> : null}
        </s.Link>
      </Link>

      <Spacer y="auto" />

      <Link href="/settings">
        <s.Link>
          <s.Icon as={IoIosSettings} />
          {open ? <s.LinkText>Settings</s.LinkText> : null}
        </s.Link>
      </Link>
    </s.Navbar>
  );
};

namespace s {
  const WIDTH = 300; // px

  export const Navbar = styled("nav", {
    display: "flex",
    flexDirection: "column",
    boxShadow: "$base",
    background: "$navbar",
    transition: ".2s",

    variants: {
      desktop: {
        true: { width: rem(WIDTH) },
        false: { width: "fit-content" },
      },
    },
  });

  export const NavbarTitle = styled("h1", {
    fontSize: "$xl",
    fontWeight: "bold",
    letterSpacing: "$wider",
  });

  export const NavbarHeader = styled("div", {
    padding: "$4",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });

  export const Link = styled("a", {
    display: "flex",
    alignItems: "center",
    gap: "$4",
    background: "transparent",
    color: "$white",
    borderRadius: "$lg",
    padding: "$2 $4",
    margin: "$1",
    textDecoration: "none",
    transition: ".2s",
    cursor: "pointer",

    "&:hover": {
      background: "$black",
    },
  });

  export const LinkText = styled("p", {});

  export const Icon = styled("svg", {
    height: rem(24),
    width: rem(24),
    color: "$white",
  });
}
