import { Project, Task } from "@prisma/client";
import { RiDeleteBinFill } from "react-icons/ri";
import { useQueryClient } from "react-query";
import { rem, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";
import { Button } from "../common/button";
import { Card as AppCard } from "../common/card";
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

  return (
    <s.Card>
      <s.Header>
        <Title>{task.title}</Title>

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

      <Description>{task.description}</Description>
    </s.Card>
  );
};

namespace s {
  export const Card = styled(AppCard, {
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

  export const HeaderActions = styled("div", {
    height: rem(25),
    display: "flex",
  });
}
