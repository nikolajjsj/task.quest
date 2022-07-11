import { Project, Todo } from "@prisma/client";
import { styled } from "../../styles/stitches.config";
import { Button, Card } from "../common/common";
import { RiDeleteBinFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { trpc } from "../../utils/trpc";
import { Spinner } from "../common/spinner";

type Props = {
  project?: Project;
  task: Todo;
};
export const TaskCard = ({ task, project }: Props) => {
  const taskColor = task.color.length > 0 ? task.color : "#000";

  const v = useQueryClient();
  const { mutate, isLoading } = trpc.useMutation(["todo.delete"], {
    onSuccess() {
      if (project?.id !== undefined) {
        v.invalidateQueries(["project.get", { id: project?.id }]);
      } else {
        v.invalidateQueries(["todo.getOther"]);
      }
    },
  });

  return (
    <Card css={{ border: `2px solid ${taskColor}`, margin: "0 auto" }}>
      <s.Header>
        <s.Title>{task.title}</s.Title>

        <s.HeaderActions>
          <Button size="sm" variant="delete" onClick={() => mutate(task.id)}>
            {isLoading ? (
              <Spinner size="small" color="white" />
            ) : (
              <RiDeleteBinFill />
            )}
          </Button>
        </s.HeaderActions>
      </s.Header>

      <s.Description>{task.description}</s.Description>
    </Card>
  );
};

namespace s {
  export const Header = styled("header", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  });

  export const Title = styled("h4", {
    fontSize: "$2xl",
    fontWeight: 600,
  });

  export const HeaderActions = styled("div", {
    display: "flex",
  });

  export const Description = styled("p", {
    margin: "$4 0",
  });
}
