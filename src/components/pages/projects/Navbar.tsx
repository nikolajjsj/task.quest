import Link from "next/link";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Button } from "../../common/button";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { ProjectSheet } from "../../common/project-sheet";

export const ProjectNavbar = () => {
  const router = useRouter();
  const { id } = router.query;
  const [projectDialog, setProjectDialog] = useState<boolean>(false);

  const { data: projects } = trpc.useQuery(["project.getAll"]);

  return (
    <>
      <div className="w-48 max-w-48 hidden flex-col items-stretch border-r p-4 gap-6 sm:flex">
        {projects?.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`}>
            <div
              className={`truncate font-bold text-slate-500 cursor-pointer ${
                id === p.id ? "text-indigo-700" : ""
              }`}
            >
              {p.title}
            </div>
          </Link>
        ))}

        <Button onClick={() => setProjectDialog(true)}>
          <FaPlus size={20} />
        </Button>
      </div>

      {projectDialog && (
        <ProjectSheet onClose={() => setProjectDialog(false)} />
      )}
    </>
  );
};
