import type { NextPage } from "next";
import { useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { Spinner } from "../../components/common/spinner";
import { ProjectDialog } from "../../components/app/ProjectDialog";
import { ProjectCard } from "../../components/app/ProjectCard";
import { trpc } from "../../utils/trpc";
import { AppTitle } from "../../components/common/text";
import { Button } from "../../components/common/button";
import { SCREEN_XL } from "../../styles/scales";

const Project: NextPage = () => {
  const [projectDialog, setProjectDialog] = useState<boolean>(false);
  const { data, isLoading } = trpc.useQuery(["project.getAll"]);

  if (isLoading) return <Spinner center />;

  return (
    <>
      <div className="flex-auto overflow-auto flex flex-col items-center gap-8 px-4 md:px-8">
        <AppTitle>Projects</AppTitle>

        <div
          className={`w-11/12 max-w-[${SCREEN_XL}px] grid mx-auto gap-4 grid-cols-1 sm:w-9/10 sm:grid-cols-2 lg:4/5 lg:grid-cols-3`}
        >
          {data?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <Button onClick={() => setProjectDialog(true)}>
          <BiBookAdd size={30} />
        </Button>
      </div>

      {projectDialog && (
        <ProjectDialog onClose={() => setProjectDialog(false)} />
      )}
    </>
  );
};
export default Project;
