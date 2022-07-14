import type { NextPage } from "next";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "../../components/common/spinner";
import { TaskDialog } from "../../components/common/task-dialog";
import { ProjectNavbar } from "../../components/pages/projects/Navbar";
import { trpc } from "../../utils/trpc";
import { AppTitle } from "../../components/common/text";
import { GhostButton } from "../../components/common/button";
import { TaskList } from "../../components/common/task-list";

const useDeleteProject = () => {
  const utils = trpc.useContext();
  const router = useRouter();

  return trpc.useMutation(["project.delete"], {
    onSuccess: () => {
      utils.invalidateQueries(["project.getAll"]);
      router.replace("/projects");
    },
  });
};

const Project: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [taskDialog, setTaskDialog] = useState<boolean>(false);

  const deleteMutation = useDeleteProject();
  const { data: projects } = trpc.useQuery(["project.getAll"]);
  const { data: project, isLoading } = trpc.useQuery([
    "project.get",
    { id: id as string },
  ]);

  if (deleteMutation.isLoading) return <Spinner center />;

  return (
    <div className="flex-auto flex">
      <ProjectNavbar projects={projects} />

      <div className="relative flex-auto w-full flex flex-col items-center overflow-auto py-8 px-4 gap-4">
        {isLoading ? (
          <Spinner center />
        ) : (
          <>
            <AppTitle>{project?.title}</AppTitle>

            <div className="flex justify-center p-4 gap-4">
              <GhostButton onClick={() => setTaskDialog(true)}>
                <FaPlus size={20} />
                Add Task
              </GhostButton>

              <GhostButton onClick={() => deleteMutation.mutate(project!.id)}>
                <RiDeleteBin7Fill size={20} className="text-red-400" />
                Delete Project
              </GhostButton>
            </div>

            <hr className="w-full border" />

            <TaskList tasks={project?.Task} />
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
