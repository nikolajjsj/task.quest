import { Project } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { ProjectDialog } from "../../app/ProjectDialog";
import { Button } from "../../common/button";

type Props = {
  projects?: Project[];
};
export const ProjectNavbar = ({ projects }: Props) => {
  const [projectDialog, setProjectDialog] = useState<boolean>(false);

  return (
    <>
      <div className="w-36 hidden flex-col items-stretch border-r border-r-black p-4 gap-2 sm:flex">
        {projects?.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`}>
            <Button variant="white">{p.title}</Button>
          </Link>
        ))}

        <Button onClick={() => setProjectDialog(true)}>Add Project</Button>
      </div>

      {projectDialog && (
        <ProjectDialog onClose={() => setProjectDialog(false)} />
      )}
    </>
  );
};
