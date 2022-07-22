import { CirclePicker } from "react-color";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { trpc } from "../../utils/trpc";
import { Button, GhostButton } from "./button";
import * as input from "./inputs";
import { Spinner } from "./spinner";
import { Error } from "./text";
import * as sheet from "./bottom-sheet";

type Inputs = {
  title: string;
  description?: string;
  tags: string[];
  color: string;
  date?: Date;
};

type Props = {
  projectId?: string;
  onClose: () => void;
};
export const TaskSheet = ({ onClose, projectId }: Props) => {
  const v = useQueryClient();
  const { mutateAsync, isLoading } = trpc.useMutation(["task.create"], {
    onSuccess() {
      v.invalidateQueries(["project.get", { id: projectId }]);
      v.invalidateQueries(["task.getAll"]);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { color: "#f44336" },
  });
  const color = watch("color");

  return (
    <sheet.BottomSheet
      title="New Task"
      onClose={onClose}
      closeOnClickOutside
      closeOnEsc
    >
      <input.Form
        onSubmit={handleSubmit(async (data) => {
          await mutateAsync({ ...data, projectId });
          onClose();
        })}
      >
        <sheet.BottomSheetContent>
          <input.InputGroup>
            <input.Label>Title</input.Label>
            <input.Input {...register("title", { required: true })} />
            {errors.title && <Error>Title is required</Error>}
          </input.InputGroup>

          <input.InputGroup>
            <input.Label>Description</input.Label>
            <input.TextArea {...register("description")} rows={5} />
          </input.InputGroup>

          <input.InputGroup>
            <input.Label>Date</input.Label>
            <input.Input
              {...register("date", { valueAsDate: true })}
              type="datetime-local"
            />
          </input.InputGroup>

          <input.InputGroup>
            <input.Label>Tags</input.Label>
            <input.TagsInput onChange={(tags) => setValue("tags", tags)} />
          </input.InputGroup>

          <input.InputGroup>
            <input.Label>Color</input.Label>
            <CirclePicker
              {...register("color", { required: true })}
              color={color}
              onChange={(color) => setValue("color", color.hex)}
            />
          </input.InputGroup>
        </sheet.BottomSheetContent>

        <sheet.BottomSheetFooter>
          <GhostButton type="button" onClick={onClose}>
            Close
          </GhostButton>

          <Button type="submit" disabled={errors == null}>
            {isLoading ? <Spinner light /> : "Save"}
          </Button>
        </sheet.BottomSheetFooter>
      </input.Form>
    </sheet.BottomSheet>
  );
};
