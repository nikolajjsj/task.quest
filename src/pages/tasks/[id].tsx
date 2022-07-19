import { Task } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, GhostButton } from "../../components/common/button";
import { Spinner } from "../../components/common/spinner";
import { EmptyMessage } from "../../components/common/text";
import { trpc } from "../../utils/trpc";

const inputStyle = "flex-auto border rounded p-2";

const Project: NextPage = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.useQuery(["task.get", id as string]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Task>({ defaultValues: useMemo(() => data ?? {}, [data]) });
  const updateTask = (values: Task) => {
    console.log("updated task: ", values);
    setEditing(false);
  };

  if (isLoading) return <Spinner center />;
  if (data == null) return <EmptyMessage>Nothing here...</EmptyMessage>;

  return (
    <div className="relative flex-auto flex flex-col items-center justify-center">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(updateTask)}>
        <label>Title</label>
        <input
          {...register("title", { required: true, disabled: !editing })}
          className={inputStyle}
          type="text"
        />

        <div className="my-2"></div>

        <label>Description</label>
        <input
          {...register("description", { disabled: !editing })}
          className={inputStyle}
          type="text"
        />

        <div className="my-2"></div>

        <label>Tags</label>
        <input
          {...register("tags", { disabled: !editing })}
          className={inputStyle}
          type="text"
        />

        <div className="my-2"></div>

        <label>Status</label>
        <input
          {...register("status", { disabled: !editing })}
          className={inputStyle}
          type="text"
        />

        <div className="my-2"></div>

        <label>Color</label>
        <input
          {...register("color", { disabled: !editing })}
          className={inputStyle}
          type="color"
        />

        <div className="my-2"></div>

        <label>Pinned</label>
        <input
          {...register("pinned", { disabled: !editing })}
          className={inputStyle}
          type="checkbox"
        />

        <div className="my-2"></div>

        <label>Priority</label>
        <input
          {...register("priority", { disabled: !editing })}
          className={inputStyle}
          type="checkbox"
        />

        <div className="my-2"></div>

        <div className="flex gap-2">
          <GhostButton type="button" onClick={() => setEditing((v) => !v)}>
            Edit
          </GhostButton>

          <Button type="submit" disabled={!editing}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Project;
