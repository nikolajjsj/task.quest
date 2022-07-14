import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { Spinner } from "../../components/common/spinner";
import { trpc } from "../../utils/trpc";
import { TaskCard } from "../../components/app/TaskCard";
import { TaskDialog } from "../../components/app/TaskDialog";
import { AppTitle } from "../../components/common/text";
import { Button } from "../../components/common/button";

const tasksStyle =
  "max-w-11/12 flex flex-wrap justify-center gap-4 md:max-w-4/5 lg:max-w-[1000px]";

const Project: NextPage = () => {
  const [taskDialog, setTaskDialog] = useState<boolean>(false);

  const { data, isLoading } = trpc.useQuery(["task.getAll"]);
  const pinnedTasks = useMemo(() => data?.filter((t) => t.pinned), [data]);
  const otherTasks = useMemo(() => data?.filter((t) => !t.pinned), [data]);

  if (isLoading) return <Spinner center />;

  return (
    <>
      <div className="flex-auto overflow-auto flex flex-col items-center gap-8 px-4 md:px-8">
        <AppTitle>Pinned Tasks</AppTitle>

        <div className={tasksStyle}>
          {pinnedTasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <div className="h-10"></div>

        <AppTitle>Tasks</AppTitle>

        <div className={tasksStyle}>
          {otherTasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <Button onClick={() => setTaskDialog(true)}>
          <BiBookAdd size={30} />
        </Button>
      </div>

      {taskDialog && <TaskDialog onClose={() => setTaskDialog(false)} />}
    </>
  );
};
export default Project;
