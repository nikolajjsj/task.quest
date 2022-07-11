import { Project, Task } from "@prisma/client";
import { FaTasks } from "react-icons/fa";
import { BsCheckCircle, BsFillCheckCircleFill } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { rem, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";
import { Button } from "../common/button";
import { Card as AppCard } from "../common/card";
import { Flex } from "../common/common";
import { Spinner } from "../common/spinner";
import { Description, Title } from "../common/text";

type Props = {
  project?: Project;
  task: Task;
};
export const TaskCard = ({ task, project }: Props) => {
  const v = useQueryClient();
  const { mutate, isLoading } = trpc.useMutation(["task.delete"], {
    onSuccess() {
      if (project?.id !== undefined) {
        v.invalidateQueries(["project.get", { id: project?.id }]);
      } else {
        v.invalidateQueries(["task.getAll"]);
      }
    },
  });
  const { mutate: mutateToggle, isLoading: toggleLoading } = trpc.useMutation(
    ["task.toggle"],
    {
      onSuccess() {
        if (project?.id !== undefined) {
          v.invalidateQueries(["project.get", { id: project?.id }]);
        } else {
          v.invalidateQueries(["task.getAll"]);
        }
      },
    },
  );

  return (
    <s.Card>
      <s.Header>
        <Flex gap={2} css={{ alignItems: "center" }}>
          <FaTasks size={20} color={task.color} />
          <Title>{task.title}</Title>
        </Flex>
      </s.Header>

      <Description>{task.description}</Description>

      <s.Actions>
        <Button
          size="sm"
          variant={task.status === "DONE" ? "success" : "delete"}
          onClick={() =>
            mutateToggle({
              id: task.id,
              status: task.status === "DONE" ? "TODO" : "DONE",
            })
          }
        >
          {toggleLoading ? (
            <Spinner size="small" color="white" />
          ) : task.status === "DONE" ? (
            <BsFillCheckCircleFill />
          ) : (
            <BsCheckCircle />
          )}
        </Button>
        <Button size="sm" variant="delete" onClick={() => mutate(task.id)}>
          {isLoading ? (
            <Spinner size="small" color="white" />
          ) : (
            <RiDeleteBinFill />
          )}
        </Button>
      </s.Actions>
    </s.Card>
  );
};

namespace s {
  export const Card = styled(AppCard, {
    position: "relative",
    minHeight: rem(150),

    "&:hover": {
      [`& ${Button}`]: {
        display: "flex",
      },
    },

    [`& ${Button}`]: {
      display: "none",
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
  });
}
