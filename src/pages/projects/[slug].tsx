import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { Spinner } from "../../components/common/spinner";
import { TaskDialog } from "../../components/app/TaskDialog";
import { ProjectNavbar } from "../../components/pages/projects/Navbar";
import { TaskCard } from "../../components/app/TaskCard";
import { rem, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";
import { AppTitle } from "../../components/common/text";
import { Button } from "../../components/common/button";

const Project: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: projects } = trpc.useQuery(["project.getAll"]);
  const { data: project, isLoading } = trpc.useQuery([
    "project.get",
    { id: slug as string },
  ]);

  const [taskDialog, setTaskDialog] = useState<boolean>(false);

  return (
    <s.Home>
      <ProjectNavbar projects={projects} />

      <s.HomeContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <AppTitle>{project?.title}</AppTitle>

            <Button onClick={() => setTaskDialog(true)}>
              Add Task <BiAddToQueue size={30} />
            </Button>

            {project == null && <p>No Tasks</p>}

            <s.Tasks>
              {project?.Task?.map((task) => (
                <TaskCard key={task.id} task={task} project={project} />
              ))}
            </s.Tasks>
          </>
        )}
      </s.HomeContent>

      {taskDialog && (
        <TaskDialog
          projectId={project?.id}
          onClose={() => setTaskDialog(false)}
        />
      )}
    </s.Home>
  );
};
export default Project;

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
