import type { NextPage } from "next";
import { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { Spinner } from "../../components/common/spinner";
import { ProjectDialog } from "../../components/app/ProjectDialog";
import { ProjectCard } from "../../components/app/ProjectCard";
import { SCREEN_XL, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";
import { TaskCard } from "../../components/app/TaskCard";
import { TaskDialog } from "../../components/app/TaskDialog";
import { AppTitle } from "../../components/common/text";
import { Button } from "../../components/common/button";
import { Spacer } from "../../components/common/spacer";

const Project: NextPage = () => {
  const [projectDialog, setProjectDialog] = useState<boolean>(false);
  const [taskDialog, setTaskDialog] = useState<boolean>(false);

  const { data: projects, isLoading: projectsLoading } = trpc.useQuery([
    "project.getAll",
  ]);
  const { data: tasks, isLoading: tasksLoading } = trpc.useQuery([
    "task.getAll",
  ]);

  if (projectsLoading || tasksLoading) return <Spinner size="large" center />;

  return (
    <>
      <s.Home>
        <AppTitle>Projects</AppTitle>

        <s.Grid>
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <Button onClick={() => setProjectDialog(true)}>
            <BiBookAdd size={30} />
          </Button>
        </s.Grid>

        <Spacer y={8} />

        <AppTitle>Orphaned Tasks</AppTitle>

        <s.Grid>
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          <Button onClick={() => setTaskDialog(true)}>
            <BiBookAdd size={30} />
          </Button>
        </s.Grid>
      </s.Home>

      {projectDialog && (
        <ProjectDialog onClose={() => setProjectDialog(false)} />
      )}
      {taskDialog && <TaskDialog onClose={() => setTaskDialog(false)} />}
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
