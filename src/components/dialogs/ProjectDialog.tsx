import { CirclePicker } from "react-color";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { trpc } from "../../utils/trpc";
import { Button, Error } from "../common/common";
import * as d from "../common/dialog";
import * as input from "../common/inputs";
import { Spinner } from "../common/spinner";

type Inputs = {
  title: string;
  description?: string;
  color: string;
};

export const ProjectDialog = ({ onClose }: { onClose: () => void }) => {
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
    <d.Dialog
      title="New Project"
      maxHeight="lg"
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
        <d.DialogContent css={{ gap: "$8" }}>
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
              onChange={(color) => {
                console.log(color);
                return setValue("color", color.hex);
              }}
            />
          </input.InputGroup>
        </d.DialogContent>

        <d.DialogFooter>
          <Button type="submit">
            {isLoading ? <Spinner color="white" /> : "Save"}
          </Button>
        </d.DialogFooter>
      </input.Form>
    </d.Dialog>
  );
};