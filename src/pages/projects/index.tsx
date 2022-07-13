import type { NextPage } from "next";
import { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { Spinner } from "../../components/common/spinner";
import { ProjectDialog } from "../../components/app/ProjectDialog";
import { ProjectCard } from "../../components/app/ProjectCard";
import { SCREEN_XL, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";
import { AppTitle } from "../../components/common/text";
import { Button } from "../../components/common/button";

const Project: NextPage = () => {
  const [projectDialog, setProjectDialog] = useState<boolean>(false);
  const { data, isLoading } = trpc.useQuery(["project.getAll"]);

  if (isLoading) return <Spinner size="large" center />;

  return (
    <>
      <s.Home>
        <AppTitle>Projects</AppTitle>

        <s.Grid>
          {data?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </s.Grid>

        <Button onClick={() => setProjectDialog(true)}>
          <BiBookAdd size={30} />
        </Button>
      </s.Home>

      {projectDialog && (
        <ProjectDialog onClose={() => setProjectDialog(false)} />
      )}
    </>
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
    gap: "$8",
    paddingBlock: "$4",

    "@md": {
      paddingBlock: "$8",
    },
  });

  export const Grid = styled("div", {
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
