import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { Button } from "../../common/button";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};
export default function SignIn({ providers }: Props) {
  return (
    <div className="flex flex-col justify-center items-center flex-auto">
      <div className="flex flex-col gap-4">
        {Object.values(providers ?? {}).map((provider) => (
          <Button key={provider.name} onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
