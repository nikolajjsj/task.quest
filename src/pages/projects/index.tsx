import type { NextPage } from "next";
import { useState } from "react";
import { Spinner } from "../../components/common/spinner";
import { ProjectCard } from "../../components/common/project-card";
import { trpc } from "../../utils/trpc";
import { AppTitle, EmptyMessage } from "../../components/common/text";
import { GhostButton } from "../../components/common/button";
import { SCREEN_XL } from "../../styles/scales";
import { FaPlus } from "react-icons/fa";
import { ProjectSheet } from "../../components/common/project-sheet";

const Project: NextPage = () => {
  const [projectDialog, setProjectDialog] = useState<boolean>(false);
  const { data, isLoading } = trpc.useQuery(["project.getAll"]);

  if (isLoading) return <Spinner center />;

  return (
    <>
      <div className="flex-auto overflow-auto flex flex-col items-center gap-8 py-4 md:py-8">
        <AppTitle>Projects</AppTitle>

        <div className="flex justify-center p-4 gap-4">
          <GhostButton onClick={() => setProjectDialog(true)}>
            <FaPlus size={20} />
            Add Project
          </GhostButton>
        </div>

        {data?.length === 0 && <EmptyMessage>No Projects Yet!</EmptyMessage>}

        <div
          className={`w-11/12 max-w-[${SCREEN_XL}px] grid mx-auto gap-4 grid-cols-1 sm:w-9/10 sm:grid-cols-2 lg:4/5 lg:grid-cols-3`}
        >
          {data?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {projectDialog && (
        <ProjectSheet onClose={() => setProjectDialog(false)} />
      )}
    </>
  );
};
export default Project;
