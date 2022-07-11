import { getProviders, useSession } from "next-auth/react";
import SignIn from "../../components/pages/auth/signin";
import SignOut from "../../components/pages/auth/signout";

type Props = {
  providers: any;
};
const Auth = ({ providers }: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return <SignIn providers={providers} />;
  } else {
    return <SignOut />;
  }
};
export default Auth;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
