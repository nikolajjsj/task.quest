import { Todo } from "@prisma/client";
import { rem, styled } from "../styles/stitches.config";
import { Card } from "./common/common";

type Props = {
  task: Todo;
};
export const TaskCard = ({ task }: Props) => {
  const taskColor = task.color.length > 0 ? task.color : "#000";

  return (
    <Card>
      <s.Title>
        {task.title}
        <s.Color css={{ background: taskColor }} />
      </s.Title>

      <s.Description>{task.description}</s.Description>
    </Card>
  );
};

namespace s {
  export const Title = styled("h4", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "$2xl",
  });

  export const Description = styled("p", {
    margin: "$4 0",
  });

  export const Color = styled("div", {
    height: rem(24),
    width: rem(24),
    borderRadius: "$lg",
  });
}
