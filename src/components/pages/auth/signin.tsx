import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { Button } from "../../common/common";
import { styled } from "../../../styles/stitches.config";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};
export default function SignIn({ providers }: Props) {
  return (
    <s.Signin>
      <s.SignInButtons>
        {Object.values(providers ?? {}).map((provider) => (
          <Button
            key={provider.name}
            variant="white"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </Button>
        ))}
      </s.SignInButtons>
    </s.Signin>
  );
}

namespace s {
  export const Signin = styled("div", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: "auto",
  });

  export const SignInButtons = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "$4",
  });
}
