import { Project, Task } from "@prisma/client";
import { RiTodoFill, RiDeleteBin7Fill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { TiPin, TiPinOutline } from "react-icons/ti";
import { useQueryClient } from "react-query";
import { rem, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";
import { Card as AppCard } from "../common/card";
import { Flex } from "../common/common";
import { Spinner } from "../common/spinner";
import { Description, Title } from "../common/text";
import { Spacer } from "../common/spacer";

type Props = {
  project?: Project;
  task: Task;
};
export const TaskCard = ({ task, project }: Props) => {
  const { invalidateQueries } = useQueryClient();
  const { mutate: remove, isLoading } = trpc.useMutation(["task.delete"], {
    onSuccess() {
      invalidateCache();
    },
  });
  const { mutate: toggle, isLoading: toggleLoading } = trpc.useMutation(
    ["task.toggle"],
    {
      onSuccess() {
        invalidateCache();
      },
    },
  );
  const { mutate: pin, isLoading: pinLoading } = trpc.useMutation(
    ["task.pin"],
    {
      onSuccess() {
        invalidateCache();
      },
    },
  );

  const invalidateCache = () => {
    if (project?.id !== undefined) {
      invalidateQueries(["project.get", { id: project?.id }]);
    } else {
      invalidateQueries(["task.getAll"]);
    }
  };

  const loading = isLoading || pinLoading || toggleLoading;

  return (
    <s.Card>
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
            onClick={() => pin({ id: task.id, pinned: !task.pinned })}
          />
        </Flex>
      </s.Header>

      <Description>{task.description}</Description>

      <s.Actions>
        <s.Icon
          as={FaCheck}
          color={task.status !== "DONE" ? "green" : "yellow"}
          onClick={() =>
            toggle({
              id: task.id,
              status: task.status === "DONE" ? "TODO" : "DONE",
            })
          }
        />

        <s.Icon
          as={RiDeleteBin7Fill}
          color="red"
          onClick={() => remove(task.id)}
        />
      </s.Actions>
    </s.Card>
  );
};

namespace s {
  export const Card = styled(AppCard, {
    margin: "0 auto",
    position: "relative",
    minHeight: rem(150),
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
