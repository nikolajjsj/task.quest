import { Project } from "@prisma/client";
import Link from "next/link";
import { GiWhiteBook } from "react-icons/gi";
import { Description, Title } from "./text";

type Props = {
  project: Project;
};
export const ProjectCard = ({ project }: Props) => {
  const tasks = (project as any).Task;

  return (
    <Link href={`projects/${project.id}`}>
      <div className="relative flex-auto w-full max-w-md rounded-lg border border-slate-500 p-6 cursor-pointer">
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
      </div>
    </Link>
  );
};
