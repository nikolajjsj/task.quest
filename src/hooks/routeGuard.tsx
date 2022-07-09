import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
  children: JSX.Element;
};
export const RouteGuard = ({ children }: Props) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.data?.user) {
      router.push({ pathname: "/auth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return children;
};
