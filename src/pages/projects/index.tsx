import type { NextPage } from "next";
import { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { AppTitle, Button, Card } from "../../components/common/common";
import { Spinner } from "../../components/common/spinner";
import { ProjectDialog } from "../../components/dialogs/ProjectDialog";
import { ProjectCard } from "../../components/ProjectCard";
import { SCREEN_XL, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";

const Project: NextPage = () => {
  const [projectDialog, setProjectDialog] = useState<boolean>(false);

  const { data: projects, isLoading: projectsLoading } = trpc.useQuery([
    "project.getAll",
  ]);

  return (
    <s.Home>
      <AppTitle>Projects</AppTitle>

      <Button onClick={() => setProjectDialog(true)}>
        <BiBookAdd size={30} />
      </Button>

      {projectsLoading ? (
        <Spinner />
      ) : (
        <s.Projects>
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </s.Projects>
      )}

      {projectDialog && (
        <ProjectDialog onClose={() => setProjectDialog(false)} />
      )}
    </s.Home>
  );
};
export default Project;

namespace s {
  export const Home = styled("div", {
    flex: "auto",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "$4",
    paddingBlock: "$4",

    "@md": {
      paddingBlock: "$8",
    },
  });

  export const Projects = styled("div", {
    width: "95%",
    maxWidth: SCREEN_XL,
    margin: "0 auto",
    display: "grid",
    gap: "$4",
    gridTemplateColumns: "1fr",

    "@sm": {
      width: "90%",
      gridTemplateColumns: "1fr 1fr",
    },

    "@lg": {
      width: "80%",
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  });
}
