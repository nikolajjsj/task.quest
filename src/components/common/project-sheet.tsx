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
  color: string;
};

export const ProjectSheet = ({ onClose }: { onClose: () => void }) => {
  const v = useQueryClient();
  const { mutateAsync, isLoading } = trpc.useMutation(["project.create"], {
    onSuccess() {
      v.invalidateQueries(["project.getAll"]);
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
      title="New Project"
      onClose={onClose}
      closeOnClickOutside
      closeOnEsc
    >
      <input.Form
        onSubmit={handleSubmit(async (data) => {
          await mutateAsync(data);
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

          <Button type="submit">
            {isLoading ? <Spinner light /> : "Save"}
          </Button>
        </sheet.BottomSheetFooter>
      </input.Form>
    </sheet.BottomSheet>
  );
};
