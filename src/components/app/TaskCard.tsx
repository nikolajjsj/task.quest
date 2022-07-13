import { Project, Task } from "@prisma/client";
import { RiTodoFill, RiDeleteBin7Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { rem, styled } from "../../styles/stitches.config";
import { Card as AppCard } from "../common/card";
import { Flex } from "../common/common";
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
    <s.Card
      onClick={(e) => {
        e.stopPropagation();
        router.push(`tasks/${task.id}`);
      }}
    >
      <s.Header>
        <Flex gap={2} css={{ flex: "auto", alignItems: "center" }}>
          {loading ? (
            <Spinner size="small" />
          ) : (
            <RiTodoFill size={20} color={task.color} />
          )}
          <Title>{task.title}</Title>

          <Spacer x="auto" />

          <s.Icon
            as={task.pinned ? TiPin : TiPinOutline}
            onClick={(e: any) => {
              e.stopPropagation();
              mutateTask.mutate({ id: task.id, pinned: !task.pinned });
            }}
          />
        </Flex>
      </s.Header>

      <Description>{task.description}</Description>

      <s.Actions>
        <s.Icon
          as={FaCheck}
          color={task.status !== "DONE" ? "green" : "yellow"}
          onClick={(e: any) => {
            e.stopPropagation();
            mutateTask.mutate({
              id: task.id,
              status: task.status === "DONE" ? "TODO" : "DONE",
            });
          }}
        />

        <s.Icon
          as={RiDeleteBin7Fill}
          color="red"
          onClick={(e: any) => {
            e.stopPropagation();
            deleteTask.mutate(task.id);
          }}
        />
      </s.Actions>
    </s.Card>
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
      console.log({ data, variables });
      if (projectId !== undefined) {
        utils.invalidateQueries(["project.get", { id: projectId }]);
      } else {
        utils.invalidateQueries(["task.getAll"]);
      }
    },
  });
};

namespace s {
  export const Card = styled(AppCard, {
    margin: "0 auto",
    position: "relative",
    minHeight: rem(150),
    cursor: "pointer",

    "&:hover": {
      background: "none rgba(0, 0, 0, 0.05)",
    },
  });

  export const Header = styled("header", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "$4",
  });

  export const Actions = styled("div", {
    position: "absolute",
    bottom: "$2",
    right: "$2",
    display: "flex",
    gap: "$2",
  });

  export const Icon = styled("svg", {
    cursor: "pointer",
    height: rem(20),
    width: rem(20),

    variants: {
      color: {
        red: { color: "$danger" },
        green: { color: "$success" },
        yellow: { color: "$warning" },
      },
    },
  });
}
