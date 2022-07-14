import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Spinner } from "../../components/common/spinner";
import { AppTitle, EmptyMessage } from "../../components/common/text";
import { trpc } from "../../utils/trpc";

const Project: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.useQuery(["task.get", id as string]);

  if (isLoading) return <Spinner center />;
  if (data == null) return <EmptyMessage>Nothing here...</EmptyMessage>;

  return (
    <div className="relative flex-auto flex flex-col items-center justify-center">
      <AppTitle>{data.title}</AppTitle>

      <p className="text-sm">{data.description}</p>
    </div>
  );
};
export default Project;
