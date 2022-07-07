import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../../components/common/common";
import { styled } from "../../styles/stitches.config";

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
      {name != null && <s.Title>{name}</s.Title>}

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

  export const Title = styled("h2", {
    fontSize: "$2xl",
    margin: "0",
  });

  export const Subtitle = styled("p", {
    fontSize: "$xl",
  });

  export const Image = styled("img", {
    borderRadius: "50%",
  });
}
