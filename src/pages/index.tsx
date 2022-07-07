import type { NextPage } from "next";
import { styled } from "../styles/stitches.config";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["todo.getAll"]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <s.Home>
      <p>This is the home page</p>
      <div>
        {data?.map((todo) => (
          <p key={todo.id}>{todo.title}</p>
        ))}
      </div>
    </s.Home>
  );
};
export default Home;

namespace s {
  export const Home = styled("div", {
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    paddingInline: "$4",
  });
}
