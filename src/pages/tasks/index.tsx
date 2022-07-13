import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { Spinner } from "../../components/common/spinner";
import { SCREEN_LG, SCREEN_XL, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";
import { TaskCard } from "../../components/app/TaskCard";
import { TaskDialog } from "../../components/app/TaskDialog";
import { AppTitle } from "../../components/common/text";
import { Button } from "../../components/common/button";
import { Spacer } from "../../components/common/spacer";

const Project: NextPage = () => {
  const [taskDialog, setTaskDialog] = useState<boolean>(false);

  const { data, isLoading } = trpc.useQuery(["task.getAll"]);
  const pinnedTasks = useMemo(() => data?.filter((t) => t.pinned), [data]);
  const otherTasks = useMemo(() => data?.filter((t) => !t.pinned), [data]);

  if (isLoading) return <Spinner size="large" center />;

  return (
    <>
      <s.Home>
        <AppTitle>Pinned Tasks</AppTitle>

        <s.Tasks>
          {pinnedTasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </s.Tasks>

        <Spacer y={10} />

        <AppTitle>Tasks</AppTitle>

        <s.Tasks>
          {otherTasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </s.Tasks>

        <Button onClick={() => setTaskDialog(true)}>
          <BiBookAdd size={30} />
        </Button>
      </s.Home>

      {taskDialog && <TaskDialog onClose={() => setTaskDialog(false)} />}
    </>
  );
};
export default Project;

namespace s {
  export const Home = styled("div", {
    flex: "auto",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "$8",
    paddingBlock: "$4",

    "@md": {
      paddingBlock: "$8",
    },
  });

  export const Tasks = styled("div", {
    maxWidth: "95%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "$4",

    "& > *": {
      width: 400,
    },

    "@md": {
      maxWidth: "80%",
    },
    "@lg": {
      maxWidth: SCREEN_LG,
    },
  });
}
