import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { styled } from "../../../styles/stitches.config";
import { Button } from "../../common/button";
import { Title } from "../../common/text";

export default function SignOut() {
  const { data: session } = useSession();
  const { name, image, email } = session!.user!;

  return (
    <s.Login>
      {image != null && (
        <s.Image
          as={Image}
          src={image}
          alt="Profile image"
          height={200}
          width={200}
        />
      )}
      {name != null && <Title>{name}</Title>}

      {email != null && <s.Subtitle>{email}</s.Subtitle>}

      <Button variant="white" onClick={() => signOut()}>
        Sign Out
      </Button>
    </s.Login>
  );
}

namespace s {
  export const Login = styled("div", {
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "$4",
    justifyContent: "center",
    alignItems: "center",
    gap: "$4",
  });

  export const Subtitle = styled("p", {
    fontSize: "$xl",
  });

  export const Image = styled("img", {
    borderRadius: "50%",
  });
}
