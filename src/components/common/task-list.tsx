import { Project, Task, User } from "@prisma/client";
import { useMemo, useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { TaskCard } from "./task-card";
import { EmptyMessage, Title } from "./text";

const tasksStyle =
  "w-full max-w-11/12 flex flex-wrap justify-center gap-4 md:max-w-4/5 lg:max-w-[1000px]";

type Props = {
  project?: Project & { Task: Task[]; user: User };
  tasks: Task[] | undefined;
};
export const TaskList = ({ tasks, project }: Props) => {
  const [showDone, setShowDone] = useState<boolean>(false);

  const pinnedTasks = useMemo(() => tasks?.filter((t) => t.pinned), [tasks]);
  const otherTasks = useMemo(
    () => tasks?.filter((t) => !t.pinned && t.status !== "DONE"),
    [tasks],
  );
  const doneTasks = useMemo(
    () => tasks?.filter((t) => !t.pinned && t.status === "DONE"),
    [tasks],
  );

  if (tasks?.length === 0) return <EmptyMessage>No Tasks Yet!</EmptyMessage>;

  return (
    <>
      {pinnedTasks !== undefined && pinnedTasks?.length > 0 && (
        <Title>Pinned</Title>
      )}

      <div className={tasksStyle}>
        {pinnedTasks?.map((task) => (
          <TaskCard key={task.id} task={task} project={project} />
        ))}
      </div>

      {otherTasks !== undefined && otherTasks?.length > 0 && (
        <Title>Tasks</Title>
      )}

      <div className={tasksStyle}>
        {otherTasks?.map((task) => (
          <TaskCard key={task.id} task={task} project={project} />
        ))}
      </div>

      {doneTasks !== undefined && doneTasks.length > 0 && (
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
                  <TaskCard key={task.id} task={task} project={project} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
