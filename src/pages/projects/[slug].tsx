import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { Spinner } from "../../components/common/spinner";
import { TaskDialog } from "../../components/app/TaskDialog";
import { ProjectNavbar } from "../../components/pages/projects/Navbar";
import { TaskCard } from "../../components/app/TaskCard";
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
    <div className="flex flex-auto">
      <ProjectNavbar projects={projects} />

      <div className="flex-auto flex flex-col overflow-auto p-4 items-center gap-4">
        {isLoading ? (
          <Spinner center />
        ) : (
          <>
            <AppTitle>{project?.title}</AppTitle>

            <Button onClick={() => setTaskDialog(true)}>
              Add Task <BiAddToQueue size={30} />
            </Button>

            {project == null && <p>No Tasks</p>}

            <div className="w-full flex flex-col gap-4">
              {project?.Task?.map((task) => (
                <TaskCard key={task.id} task={task} project={project} />
              ))}
            </div>
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
