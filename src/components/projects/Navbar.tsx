import { Project } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { rem, styled } from "../../styles/stitches.config";
import { Button, Spacer } from "../common/common";
import { ProjectDialog } from "../dialogs/ProjectDialog";

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

        <Spacer y="auto" />

        <Link href={`/projects/other`}>
          <Button variant="white">Other</Button>
        </Link>
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
    padding: "$2",
    gap: "$2",
  });
}
