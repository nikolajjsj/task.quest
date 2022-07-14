import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "../../components/common/spinner";
import { TaskDialog } from "../../components/common/task-dialog";
import { ProjectNavbar } from "../../components/pages/projects/Navbar";
import { TaskCard } from "../../components/common/task-card";
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
    <div className="flex-auto flex">
      <ProjectNavbar projects={projects} />

      <div className="relative flex-auto w-full flex flex-col items-center overflow-auto p-4 gap-4">
        {isLoading ? (
          <Spinner center />
        ) : (
          <>
            <AppTitle>{project?.title}</AppTitle>

            {project == null && <p>No Tasks</p>}

            <div className="w-full flex flex-col items-center gap-4">
              {project?.Task?.map((task) => (
                <TaskCard key={task.id} task={task} project={project} />
              ))}
            </div>

            <Button onClick={() => setTaskDialog(true)}>+</Button>
          </>
        )}
      </div>

      {taskDialog && (
        <TaskDialog
          projectId={project?.id}
          onClose={() => setTaskDialog(false)}
        />
      )}
    </div>
  );
};
export default Project;
