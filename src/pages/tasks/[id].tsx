import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Spinner } from "../../components/common/spinner";
import { styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";
import { AppTitle } from "../../components/common/text";

const Project: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.useQuery(["task.get", id as string]);

  if (isLoading) return <Spinner size="large" center />;
  if (data == null) return <p>Nothing here...</p>;

  return (
    <s.Home>
      <AppTitle>{data.title}</AppTitle>

      <s.Detail>{data.color}</s.Detail>
      <s.Detail>{data.date?.toTimeString()}</s.Detail>
      <s.Detail>{data.description}</s.Detail>
      <s.Detail>{data.pinned}</s.Detail>
      <s.Detail>{data.priority}</s.Detail>
      <s.Detail>{data.status}</s.Detail>
      <s.Detail>{data.tags}</s.Detail>
      <s.Detail>{data.user.name}</s.Detail>
    </s.Home>
  );
};
export default Project;

namespace s {
  export const Home = styled("div", {
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  });

  export const Detail = styled("p", {
    fontSize: "$sm",
  });
}
