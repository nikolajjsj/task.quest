import { CirclePicker } from "react-color";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { trpc } from "../../utils/trpc";
import { Button } from "../common/button";
import * as input from "../common/inputs";
import { Spinner } from "../common/spinner";
import { Error } from "../common/text";
import * as d from "../common/dialog";

type Inputs = {
  title: string;
  description?: string;
  tags: string;
  color: string;
  date?: Date;
};

type Props = {
  projectId?: string;
  onClose: () => void;
};
export const TaskDialog = ({ onClose, projectId }: Props) => {
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
    <d.Dialog title="New Task" onClose={onClose} closeOnClickOutside closeOnEsc>
      <input.Form
        onSubmit={handleSubmit(async (data) => {
          await mutateAsync({ ...data, projectId });
          onClose();
        })}
      >
        <d.DialogContent>
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
        </d.DialogContent>

        <d.DialogFooter>
          <Button type="submit" disabled={errors == null}>
            {isLoading ? <Spinner center /> : "Save"}
          </Button>
        </d.DialogFooter>
      </input.Form>
    </d.Dialog>
  );
};
