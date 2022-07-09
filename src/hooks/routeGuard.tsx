import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {
  children: JSX.Element;
};
export const RouteGuard = ({ children }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath, session.status);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", (h) =>
      authCheck(h, session.status),
    );

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", (h) =>
        authCheck(h, session.status),
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(
    url: string,
    status: "loading" | "authenticated" | "unauthenticated",
  ) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/auth"];
    const path = url.split("?")[0] ?? "";
    console.log({ session });
    if (status === "unauthenticated" && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({ pathname: publicPaths[0] });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
};
