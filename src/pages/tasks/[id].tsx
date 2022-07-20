import { Task } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, GhostButton } from "../../components/common/button";
import { Spinner } from "../../components/common/spinner";
import { EmptyMessage } from "../../components/common/text";
import { trpc } from "../../utils/trpc";

const useMutateTask = () => {
  const utils = trpc.useContext();
  return trpc.useMutation(["task.update"], {
    onSuccess: (data) => {
      utils.setQueryData(["task.get", data.id], data);
    },
  });
};

const inputStyle =
  "flex-auto border rounded p-2 focus:outline-none focus:ring focus:ring-indigo-400";
const checkboxStyle = "active:bg-indigo-400";

const Project: NextPage = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.useQuery(["task.get", id as string]);

  const mutateTask = useMutateTask();
  const loading = mutateTask.isLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Task>({
    defaultValues: data ?? {},
  });
  const updateTask = async (values: Task) => {
    if (JSON.stringify(values) === JSON.stringify(data)) return;
    console.log("updated task: ", values);
    await mutateTask.mutateAsync(values);
    setEditing(false);
  };

  useEffect(() => {
    if (data == null) return;
    for (const key of Object.keys(data)) {
      const k = key as any;
      const d = data as any;
      setValue(k, d[k]);
    }
  }, [data]);

  if (isLoading || loading) return <Spinner center />;
  if (data == null) return <EmptyMessage>Nothing here...</EmptyMessage>;

  const spacer = <div className="my-2"></div>;

  return (
    <div className="relative flex-auto flex flex-col items-center justify-center">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(updateTask)}>
        <label>Title</label>
        <input
          {...register("title", { required: true, disabled: !editing })}
          className={inputStyle}
          type="text"
        />

        {spacer}

        <label>Description</label>
        <textarea
          {...register("description", { disabled: !editing })}
          className={inputStyle}
          rows={4}
        />

        {spacer}

        <label>Tags</label>
        <input
          {...register("tags", { disabled: !editing })}
          className={inputStyle}
          type="text"
        />

        {spacer}

        <div className="flex gap-4">
          <div className="flex-auto flex flex-col gap-2">
            <label>Status</label>
            <input
              {...register("status", { disabled: !editing })}
              className={inputStyle}
              type="text"
            />
          </div>

          <div className="flex-auto flex flex-col gap-2">
            <label>Color</label>
            <input
              {...register("color", { disabled: !editing })}
              type="color"
              defaultValue={data.color}
            />
          </div>
        </div>

        {spacer}

        <div className="flex gap-4">
          <div className="flex-auto flex gap-2">
            <label>Pinned</label>
            <input
              {...register("pinned", { disabled: !editing })}
              type="checkbox"
            />
          </div>

          <div className="flex-auto flex gap-2">
            <label>Priority</label>
            <input
              {...register("priority", { disabled: !editing })}
              type="checkbox"
            />
          </div>
        </div>

        {spacer}

        {editing ? (
          <Button type="submit" disabled={!editing}>
            Submit
          </Button>
        ) : (
          <GhostButton type="button" onClick={() => setEditing((v) => !v)}>
            Edit
          </GhostButton>
        )}
      </form>
    </div>
  );
};
export default Project;
