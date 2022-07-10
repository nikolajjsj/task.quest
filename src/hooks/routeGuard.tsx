import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Spinner } from "../components/common/spinner";

const allowedUrls: string[] = ["/auth", "/pomodoro"];

type Props = {
  children: JSX.Element;
};
export const RouteGuard = ({ children }: Props) => {
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (allowedUrls.includes(router.asPath) || status === "loading") return;
    if (!data?.user) router.push({ pathname: "/auth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  if (status === "loading") {
    return <Spinner size="large" color="black" center />;
  }

  return children;
};
