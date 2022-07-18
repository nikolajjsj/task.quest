import { Project, Task, User } from "@prisma/client";
import { useMemo } from "react";
import { TaskCard } from "./task-card";
import { EmptyMessage, Title } from "./text";

const tasksStyle =
  "w-full max-w-11/12 flex flex-col items-center justify-center md:max-w-4/5 lg:max-w-[1000px]";

type Props = {
  project?: Project & { Task: Task[]; user: User };
  tasks: Task[] | undefined;
};
export const TaskList = ({ tasks, project }: Props) => {
  const pinnedTasks = useMemo(() => tasks?.filter((t) => t.pinned), [tasks]);
  const otherTasks = useMemo(() => {
    const nonPinned = tasks?.filter((t) => !t.pinned);
    nonPinned?.sort(
      (a, b) => (a.status === "DONE" ? 1 : 0) - (b.status === "DONE" ? 1 : 0),
    );
    return nonPinned;
  }, [tasks]);

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

      <div className={tasksStyle}>
        {otherTasks?.map((task) => (
          <TaskCard key={task.id} task={task} project={project} />
        ))}
      </div>
    </>
  );
};
