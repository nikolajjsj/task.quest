import { Project } from "@prisma/client";
import Link from "next/link";
import { GiWhiteBook } from "react-icons/gi";
import { Card } from "./card";
import { Description, Title } from "./text";

type Props = {
  project: Project;
};
export const ProjectCard = ({ project }: Props) => {
  const tasks = (project as any).Task;

  return (
    <Link href={`projects/${project.id}`}>
      <Card className="relative p-6 cursor-pointer">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <GiWhiteBook size={25} color={project.color} opacity={0.5} />
            <Title>{project.title}</Title>
          </div>
          <Description>
            {tasks.length > 0
              ? `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"}`
              : null}
          </Description>
        </div>

        <Description>{project.description}</Description>
      </Card>
    </Link>
  );
};
