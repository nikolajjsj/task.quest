import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { AppTitle, Button, Spacer } from "../../components/common/common";
import { Spinner } from "../../components/common/spinner";
import { ProjectDialog } from "../../components/dialogs/ProjectDialog";
import { TaskDialog } from "../../components/dialogs/TaskDialog";
import { ProjectNavbar } from "../../components/projects/Navbar";
import { TaskCard } from "../../components/TaskCard";
import { rem, styled } from "../../styles/stitches.config";
import { trpc } from "../../utils/trpc";

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
              Add Todo <BiAddToQueue size={30} />
            </Button>

            {project == null && <p>No todos</p>}

            <s.Tasks>
              {project?.Todo?.map((todo) => (
                <TaskCard key={todo.id} task={todo} project={project} />
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
