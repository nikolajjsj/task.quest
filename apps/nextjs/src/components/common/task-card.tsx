import { Project, Task } from "@prisma/client";
import * as bs from "react-icons/bs";
import { Title } from "../common/text";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Spacer } from "./spacer";
import { formatDateRelative } from "../../utils/time";

type Props = {
  project?: Project;
  task: Task;
};
export const TaskCard = ({ task, project }: Props) => {
  const router = useRouter();
  const mutateTask = useMutateTask(project?.id);
  const loading = mutateTask.isLoading;

  const isDone = task.status === "DONE";

  return (
    <div
      className={`flex flex-col flex-auto gap-1 w-full max-w-md border-b py-4 ${
        isDone ? "opacity-30 py-1" : ""
      }`}
    >
      <div className="flex-auto flex items-center gap-2">
        {loading ? (
          <bs.BsCircleHalf
            size={20}
            color={task.color}
            className="animate-spin select-none"
          />
        ) : task.status === "DONE" ? (
          <bs.BsCheckCircle
            size={20}
            color={task.color}
            className="cursor-pointer hover:opacity-50"
            onClick={() => mutateTask.mutate({ ...task, status: "TODO" })}
          />
        ) : (
          <bs.BsCircle
            size={20}
            color={task.color}
            className="cursor-pointer hover:opacity-50"
            onClick={() => mutateTask.mutate({ ...task, status: "DONE" })}
          />
        )}

        <Title
          className="flex-auto cursor-pointer"
          onClick={() => router.push(`/tasks/${task.id}`)}
        >
          {task.title}
        </Title>
      </div>

      {!isDone && (
        <div className="flex-auto flex items-center gap-2 pl-7">
          {task.date !== null && (
            <p
              className={`flex items-center gap-1 text-sm ${
                new Date() < task.date ? "text-green-700" : "text-red-700"
              }`}
            >
              <bs.BsCalendar2Minus size={15} /> {formatDateRelative(task.date)}
            </p>
          )}

          {task.tags.map((tag, idx) => (
            <p
              key={tag + idx}
              className="flex items-center gap-1 text-sm text-gray-500"
            >
              <bs.BsFillTagFill size={15} /> {tag}
            </p>
          ))}

          <Spacer direction="x" />

          {project !== undefined && (
            <p
              className="flex items-center gap-1 text-sm text-gray-700 font-semibold cursor-pointer"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              {project?.title}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const useMutateTask = (projectId?: string) => {
  const utils = trpc.useContext();
  return trpc.useMutation(["task.update"], {
    onSuccess: () => {
      if (projectId !== undefined) {
        utils.invalidateQueries(["project.get", { id: projectId }]);
      } else {
        utils.invalidateQueries(["task.getAll"]);
      }
    },
  });
};
