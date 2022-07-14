import type { NextPage } from "next";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Spinner } from "../../components/common/spinner";
import { trpc } from "../../utils/trpc";
import { TaskDialog } from "../../components/common/task-dialog";
import { AppTitle } from "../../components/common/text";
import { GhostButton } from "../../components/common/button";
import { TaskList } from "../../components/common/task-list";

const Project: NextPage = () => {
  const [taskDialog, setTaskDialog] = useState<boolean>(false);

  const { data, isLoading } = trpc.useQuery(["task.getAll"]);

  if (isLoading) return <Spinner center />;

  return (
    <>
      <div className="flex-auto overflow-auto flex flex-col items-center gap-8 px-2 py-4 md:py-8">
        <AppTitle>Tasks</AppTitle>

        <div className="flex justify-center p-4 gap-4">
          <GhostButton onClick={() => setTaskDialog(true)}>
            <FaPlus size={20} />
            Add Task
          </GhostButton>
        </div>

        <hr className="w-full border" />

        <TaskList tasks={data} />
      </div>

      {taskDialog && <TaskDialog onClose={() => setTaskDialog(false)} />}
    </>
  );
};
export default Project;
