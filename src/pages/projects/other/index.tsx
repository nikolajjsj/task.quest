import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { AppTitle, Button, Spacer } from "../../../components/common/common";
import { Spinner } from "../../../components/common/spinner";
import { ProjectDialog } from "../../../components/dialogs/ProjectDialog";
import { TaskDialog } from "../../../components/dialogs/TaskDialog";
import { TaskCard } from "../../../components/TaskCard";
import { rem, styled } from "../../../styles/stitches.config";
import { trpc } from "../../../utils/trpc";

const ProjectOther: NextPage = () => {
  const { data: projects, isLoading: projectsLoading } = trpc.useQuery([
    "project.getAll",
  ]);
  const { data: todos, isLoading } = trpc.useQuery(["todo.getOthers"]);

  const [taskDialog, setTaskDialog] = useState<boolean>(false);
  const [projectDialog, setProjectDialog] = useState<boolean>(false);

  return (
    <s.Home>
      <s.HomeNavbar>
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
      </s.HomeNavbar>

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
