import { Project } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { rem, styled } from "../../../styles/stitches.config";
import { ProjectDialog } from "../../app/ProjectDialog";
import { Button } from "../../common/button";

type Props = {
  projects?: Project[];
};
export const ProjectNavbar = ({ projects }: Props) => {
  const [projectDialog, setProjectDialog] = useState<boolean>(false);

  return (
    <>
      <s.ProjectNavbar>
        {projects?.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`}>
            <Button variant="white">{p.title}</Button>
          </Link>
        ))}

        <Button onClick={() => setProjectDialog(true)}>Add Project</Button>
      </s.ProjectNavbar>

      {projectDialog && (
        <ProjectDialog onClose={() => setProjectDialog(false)} />
      )}
    </>
  );
};

namespace s {
  export const ProjectNavbar = styled("div", {
    width: rem(150),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    borderRight: "1px solid $black",
    padding: "$4",
    gap: "$2",
  });
}
