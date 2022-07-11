import { Project } from "@prisma/client";
import Link from "next/link";
import { GiWhiteBook } from "react-icons/gi";
import { rem, styled } from "../../styles/stitches.config";
import { Card as AppCard } from "../common/card";
import { Flex } from "../common/common";
import { Description, Title } from "../common/text";

type Props = {
  project: Project;
};
export const ProjectCard = ({ project }: Props) => {
  const tasks = (project as any).Task;

  return (
    <Link href={`projects/${project.id}`}>
      <s.Card>
        <s.Header>
          <Flex gap={2} css={{ alignItems: "center" }}>
            <GiWhiteBook size={25} color={project.color} opacity={0.5} />
            <Title>{project.title}</Title>
          </Flex>
          <Description>
            {tasks.length > 0
              ? `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`
              : null}
          </Description>
        </s.Header>

        <Description>{project.description}</Description>
      </s.Card>
    </Link>
  );
};

namespace s {
  export const Card = styled(AppCard, {
    minHeight: rem(150),
    margin: "0 auto",
    cursor: "pointer",

    "&:hover": {
      background: "none rgba(0, 0, 0, 0.05)",
    },
  });

  export const Header = styled("header", {
    display: "flex",
    flexDirection: "column",
    gap: "$2",
  });
}
