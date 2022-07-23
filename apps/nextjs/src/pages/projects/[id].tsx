import type { NextPage } from "next";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "../../components/common/spinner";
import { ProjectNavbar } from "../../components/pages/projects/Navbar";
import { trpc } from "../../utils/trpc";
import { AppTitle, EmptyMessage } from "../../components/common/text";
import { GhostButton } from "../../components/common/button";
import { TaskList } from "../../components/common/task-list";
import { TaskSheet } from "../../components/common/task-sheet";

const Project: NextPage = () => {
  return (
    <div className="flex-auto flex">
      <ProjectNavbar />

      <ProjectContent />
    </div>
  );
};
export default Project;

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

const ProjectContent = () => {
  const [taskDialog, setTaskDialog] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;

  const deleteMutation = useDeleteProject();
  const project = trpc.useQuery(["project.get", { id: id as string }]);

  if (deleteMutation.isLoading || project.isLoading) return <Spinner center />;
  if (project.data == null) return <EmptyMessage>Nothing here...</EmptyMessage>;

  return (
    <>
      <div className="relative flex-auto w-full flex flex-col items-center overflow-auto py-8 px-4 gap-4">
        <AppTitle>{project.data.title}</AppTitle>

        <div className="flex flex-col justify-center p-4 gap-4 sm:flex-row">
          <GhostButton onClick={() => setTaskDialog(true)}>
            <FaPlus size={20} />
            Add Task
          </GhostButton>

          <GhostButton onClick={() => deleteMutation.mutate(project.data!.id)}>
            <RiDeleteBin7Fill size={20} className="text-red-400" />
            Delete Project
          </GhostButton>
        </div>

        <hr className="w-full border" />

        <TaskList tasks={project.data.Task} project={project.data} />
      </div>

      {taskDialog && (
        <TaskSheet
          projectId={project.data.id}
          onClose={() => setTaskDialog(false)}
        />
      )}
    </>
  );
};
