import type { NextPage } from "next";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { AppTitle, Button } from "../../../components/common/common";
import { Spinner } from "../../../components/common/spinner";
import { ProjectDialog } from "../../../components/app/ProjectDialog";
import { TaskDialog } from "../../../components/app/TaskDialog";
import { ProjectNavbar } from "../../../components/pages/projects/Navbar";
import { TaskCard } from "../../../components/app/TaskCard";
import { rem, styled } from "../../../styles/stitches.config";
import { trpc } from "../../../utils/trpc";

const ProjectOther: NextPage = () => {
  const { data: projects, isLoading: projectsLoading } = trpc.useQuery([
    "project.getAll",
  ]);
  const { data: todos, isLoading } = trpc.useQuery(["todo.getOther"]);

  const [taskDialog, setTaskDialog] = useState<boolean>(false);
  const [projectDialog, setProjectDialog] = useState<boolean>(false);

  return (
    <s.Home>
      <ProjectNavbar projects={projects} />

      <s.HomeContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <AppTitle>Other Todos</AppTitle>

            <Button onClick={() => setTaskDialog(true)}>
              Add Todo <BiAddToQueue size={30} />
            </Button>

            {todos == null && <p>No todos</p>}

            <s.Tasks>
              {todos?.map((todo) => (
                <TaskCard key={todo.id} task={todo} />
              ))}
            </s.Tasks>
          </>
        )}
      </s.HomeContent>

      {taskDialog && (
        <TaskDialog
          projectId={undefined}
          onClose={() => setTaskDialog(false)}
        />
      )}
      {projectDialog && (
        <ProjectDialog onClose={() => setProjectDialog(false)} />
      )}
    </s.Home>
  );
};
export default ProjectOther;

namespace s {
  export const Home = styled("div", {
    flex: "auto",
    display: "flex",
  });

  export const HomeNavbar = styled("div", {
    width: rem(150),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    borderRight: "1px solid $black",
    padding: "$2",
    gap: "$2",
  });

  export const HomeContent = styled("div", {
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: "$4",
    alignItems: "center",
    gap: "$4",
  });

  export const Tasks = styled("div", {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "$4",
  });
}
