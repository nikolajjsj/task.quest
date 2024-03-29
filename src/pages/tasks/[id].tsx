import { Task } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import { useForm } from "react-hook-form";
import {
  Button,
  DeleteButton,
  GhostButton,
} from "../../components/common/button";
import * as input from "../../components/common/inputs";
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

const useDeleteTask = () => {
  const router = useRouter();
  return trpc.useMutation(["task.delete"], {
    onSuccess: () => {
      router.back();
    },
  });
};

const Project: NextPage = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = trpc.useQuery(["task.get", id as string]);

  const mutateTask = useMutateTask();
  const deleteTask = useDeleteTask();
  const loading = mutateTask.isLoading || deleteTask.isLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Task>({
    defaultValues: data ?? {},
  });
  const color = watch("color");
  const updateTask = async (values: Task) => {
    if (JSON.stringify(values) === JSON.stringify(data)) return;
    await mutateTask.mutateAsync({ ...values });
    setEditing(false);
  };

  useEffect(() => {
    if (data == null) return;
    for (const key of Object.keys(data)) {
      const k = key as any;
      const d = data as any;
      setValue(k, d[k]);
    }
  }, [data, setValue]);

  if (isLoading || loading) return <Spinner center />;
  if (data == null) return <EmptyMessage>Nothing here...</EmptyMessage>;

  const spacer = <div className="my-2"></div>;

  return (
    <div className="flex-auto overflow-auto flex flex-col items-center">
      <input.Form
        className="w-full max-w-screen-md py-12 px-4"
        onSubmit={handleSubmit(updateTask)}
      >
        {spacer}
        <input.InputGroup>
          <input.Label>Title</input.Label>
          <input.Input
            {...register("title", { required: true, disabled: !editing })}
            type="text"
          />
          {errors.title?.message !== undefined && (
            <input.Error>Title required</input.Error>
          )}
        </input.InputGroup>

        {spacer}

        <input.InputGroup>
          <input.Label>Description</input.Label>
          <input.TextArea
            {...register("description", { disabled: !editing })}
            rows={4}
          />
        </input.InputGroup>

        {spacer}

        <input.InputGroup>
          <input.Label>Tags</input.Label>
          <input.TagsInput
            disabled={!editing}
            initialTags={data.tags}
            onChange={(tags) => setValue("tags", tags)}
          />
        </input.InputGroup>

        {spacer}

        <div className="flex flex-col gap-4 md:flex-row">
          <input.InputGroup>
            <input.Label>Date</input.Label>
            <input.Input
              {...register("date", { disabled: !editing, valueAsDate: true })}
              type="datetime-local"
              defaultValue={data.date?.toISOString().slice(0, -1)}
            />
          </input.InputGroup>

          <input.InputGroup>
            <input.Label>Status</input.Label>
            <input.Input
              {...register("status", { disabled: !editing })}
              type="text"
            />
          </input.InputGroup>
        </div>

        {spacer}

        <input.InputGroup className="items-center">
          <input.Label>Color</input.Label>
          <CirclePicker
            {...register("color", { required: true })}
            color={color}
            onChange={(color) => setValue("color", color.hex)}
          />
        </input.InputGroup>

        {spacer}

        <div className="flex flex-col justify-center gap-8 md:flex-row">
          <input.InputGroup className="items-center">
            <input.Label>Pinned</input.Label>
            <input.Checkbox
              {...register("pinned", { disabled: !editing })}
              type="checkbox"
            />
          </input.InputGroup>

          <input.InputGroup className="items-center">
            <input.Label>Priority</input.Label>
            <input.Checkbox
              {...register("priority", { disabled: !editing })}
              type="checkbox"
            />
          </input.InputGroup>
        </div>

        {spacer}

        <div className="flex gap-8 justify-center">
          {editing ? (
            <>
              <GhostButton type="button" onClick={() => setEditing(false)}>
                Cancel
              </GhostButton>

              <DeleteButton
                type="button"
                disabled={!editing}
                onClick={async () => await deleteTask.mutateAsync(data.id)}
              >
                Delete
              </DeleteButton>

              <Button type="submit" disabled={!editing}>
                Submit
              </Button>
            </>
          ) : (
            <GhostButton type="button" onClick={() => setEditing((v) => !v)}>
              Edit
            </GhostButton>
          )}
        </div>
        {spacer}
      </input.Form>
    </div>
  );
};
export default Project;
