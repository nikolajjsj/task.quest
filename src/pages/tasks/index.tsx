import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { Spinner } from "../../components/common/spinner";
import { trpc } from "../../utils/trpc";
import { TaskCard } from "../../components/common/task-card";
import { TaskDialog } from "../../components/common/task-dialog";
import { AppTitle, Title } from "../../components/common/text";
import { Button, GhostButton } from "../../components/common/button";

const tasksStyle =
  "w-full max-w-11/12 flex flex-wrap justify-center gap-4 md:max-w-4/5 lg:max-w-[1000px]";

const Project: NextPage = () => {
  const [taskDialog, setTaskDialog] = useState<boolean>(false);
  const [showDone, setShowDone] = useState<boolean>(false);

  const { data, isLoading } = trpc.useQuery(["task.getAll"]);
  const pinnedTasks = useMemo(() => data?.filter((t) => t.pinned), [data]);
  const otherTasks = useMemo(
    () => data?.filter((t) => !t.pinned && t.status !== "DONE"),
    [data],
  );
  const doneTasks = useMemo(
    () => data?.filter((t) => !t.pinned && t.status === "DONE"),
    [data],
  );

  if (isLoading) return <Spinner center />;

  return (
    <>
      <div className="flex-auto overflow-auto flex flex-col items-center gap-8 px-2 py-4 md:py-8">
        <AppTitle>Tasks</AppTitle>

        <div className="flex justify-center p-4 gap-4">
          <GhostButton onClick={() => setTaskDialog(true)}>
            <FaPlus size={20} />
            Add Task
          </GhostButton>
        </div>

        <hr className="w-full border" />

        <Title>Pinned</Title>

        <div className={tasksStyle}>
          {pinnedTasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <Title>Tasks</Title>

        <div className={tasksStyle}>
          {otherTasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <div className="w-full max-w-md border rounded select-none p-4">
          <div
            className="w-full max-w-md mx-auto flex items-center justify-between p-2 cursor-pointer"
            onClick={() => setShowDone((val) => !val)}
          >
            <Title className="text-gray-500">Finished Tasks</Title>
            {showDone ? (
              <BsArrowUpShort size={30} className="text-gray-500" />
            ) : (
              <BsArrowDownShort size={30} className="text-gray-500" />
            )}
          </div>

          {showDone && (
            <>
              <hr className="my-4"></hr>
              <div className={tasksStyle}>
                {doneTasks?.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {taskDialog && <TaskDialog onClose={() => setTaskDialog(false)} />}
    </>
  );
};
export default Project;
