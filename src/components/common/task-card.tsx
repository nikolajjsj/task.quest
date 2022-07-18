import { Project, Task } from "@prisma/client";
import * as bs from "react-icons/bs";
import { Title } from "../common/text";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Spacer } from "./spacer";

type Props = {
  project?: Project;
  task: Task;
};
export const TaskCard = ({ task, project }: Props) => {
  const router = useRouter();
  const mutateTask = useMutateTask(project?.id);
  const loading = mutateTask.isLoading;

  return (
    <div className="flex flex-col flex-auto gap-1 w-full max-w-md border-b py-4">
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
            onClick={() => mutateTask.mutate({ id: task.id, status: "TODO" })}
          />
        ) : (
          <bs.BsCircle
            size={20}
            color={task.color}
            className="cursor-pointer hover:opacity-50"
            onClick={() => mutateTask.mutate({ id: task.id, status: "DONE" })}
          />
        )}

        <Title
          className="flex-auto cursor-pointer"
          onClick={() => router.push(`/tasks/${task.id}`)}
        >
          {task.title}
        </Title>
      </div>

      <div className="flex-auto flex items-center gap-2 pl-7">
        {task.date !== null && (
          <p className="flex items-center gap-1 text-sm text-green-700">
            <bs.BsCalendar2Minus size={15} /> {task.date.toDateString()}
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
            className="flex items-center gap-1 text-sm cursor-pointer"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            {project?.title}
          </p>
        )}
      </div>
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
