import { Project, Task } from "@prisma/client";
import { RiTodoFill, RiDeleteBin7Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { Spinner } from "../common/spinner";
import { Description, Title } from "../common/text";
import { Spacer } from "../common/spacer";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

type Props = {
  project?: Project;
  task: Task;
};
export const TaskCard = ({ task, project }: Props) => {
  const router = useRouter();
  const mutateTask = useMutateTask(project?.id);
  const deleteTask = useDeleteTask(project?.id);

  const loading = mutateTask.isLoading || deleteTask.isLoading;

  return (
    <div
      className="relative flex-auto w-full max-w-md rounded-lg border border-slate-500 p-6 cursor-pointer"
      onClick={(e: any) => {
        e.stopPropagation();
        router.push(`/tasks/${task.id}`);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="gap-2 flex-auto flex items-center">
          {loading ? (
            <Spinner center />
          ) : (
            <RiTodoFill size={20} color={task.color} />
          )}

          <Title>{task.title}</Title>

          <Spacer direction="x" />

          {task.pinned ? (
            <TiPin
              className="h-6 w-6 cursor-pointer"
              onClick={(e: any) => {
                e.stopPropagation();
                mutateTask.mutate({ id: task.id, pinned: !task.pinned });
              }}
            />
          ) : (
            <TiPinOutline
              className="h-6 w-6 cursor-pointer"
              onClick={(e: any) => {
                e.stopPropagation();
                mutateTask.mutate({ id: task.id, pinned: !task.pinned });
              }}
            />
          )}
        </div>
      </div>

      <Description className="py-4">{task.description}</Description>

      <div className="flex justify-end gap-2">
        <FaCheck
          className={`h-5 w-5 cursor-pointe ${
            task.status === "DONE" ? "text-green-600" : "text-gray-400"
          }`}
          onClick={(e: any) => {
            e.stopPropagation();
            mutateTask.mutate({
              id: task.id,
              status: task.status === "DONE" ? "TODO" : "DONE",
            });
          }}
        />

        <RiDeleteBin7Fill
          className={`h-5 w-5 cursor-pointe text-red-400`}
          onClick={(e: any) => {
            e.stopPropagation();
            deleteTask.mutate(task.id);
          }}
        />
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

const useDeleteTask = (projectId?: string) => {
  const utils = trpc.useContext();
  return trpc.useMutation(["task.delete"], {
    onSuccess: (data, variables) => {
      if (projectId !== undefined) {
        utils.invalidateQueries(["project.get", { id: projectId }]);
      } else {
        utils.invalidateQueries(["task.getAll"]);
      }
    },
  });
};
