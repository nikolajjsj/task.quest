import { Project } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { ProjectDialog } from "../../common/project-dialog";
import { Button } from "../../common/button";
import { useRouter } from "next/router";

type Props = {
  projects?: Project[];
};
export const ProjectNavbar = ({ projects }: Props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [projectDialog, setProjectDialog] = useState<boolean>(false);

  return (
    <>
      <div className="w-48 hidden flex-col items-stretch border-r p-4 gap-6 sm:flex">
        {projects?.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`}>
            <div
              className={`truncate font-bold text-slate-500 cursor-pointer ${
                slug === p.id ? "text-indigo-700" : ""
              }`}
            >
              {p.title}
            </div>
          </Link>
        ))}

        <Button onClick={() => setProjectDialog(true)}>+</Button>
      </div>

      {projectDialog && (
        <ProjectDialog onClose={() => setProjectDialog(false)} />
      )}
    </>
  );
};
