import type { NextPage } from "next";
import { useState } from "react";
import { SwatchesPicker } from "react-color";
import { useForm } from "react-hook-form";
import { BiAddToQueue } from "react-icons/bi";
import { useQueryClient } from "react-query";
import { AppTitle, Button, Span } from "../components/common/common";
import * as d from "../components/common/dialog";
import * as input from "../components/common/inputs";
import { Spinner } from "../components/common/spinner";
import { TaskCard } from "../components/TaskCard";
import { styled } from "../styles/stitches.config";
import { trpc } from "../utils/trpc";

type Inputs = {
  title: string;
  description?: string;
  tags: string;
  color: string;
  date?: Date;
};

const Home: NextPage = () => {
  const [taskDialog, setTaskDialog] = useState<boolean>(false);
  const { data, isLoading } = trpc.useQuery(["todo.getAll"]);

  return (
    <s.Home>
      <AppTitle>
        task<Span css={{ color: "grey" }}>.quest</Span>
      </AppTitle>

      <Button onClick={() => setTaskDialog((val) => !val)}>
        <BiAddToQueue size={30} />
      </Button>

      {isLoading ? (
        <Spinner />
      ) : (
        <s.Tasks>
          {data?.map((todo) => (
            <TaskCard key={todo.id} task={todo} />
          ))}
        </s.Tasks>
      )}

      {taskDialog && <TaskDialog onClose={() => setTaskDialog(false)} />}
    </s.Home>
  );
};
export default Home;

const TaskDialog = ({ onClose }: { onClose: () => void }) => {
  const v = useQueryClient();
  const { mutateAsync, isLoading } = trpc.useMutation(["todo.create"], {
    onSuccess() {
      v.invalidateQueries(["todo.getAll"]);
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { color: "#fff" },
  });
  const color = watch("color");

  return (
    <d.Dialog
      title="New task"
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
            {errors.title && <s.Error>Title is required</s.Error>}
          </input.InputGroup>

          <input.InputGroup>
            <input.Label>Description</input.Label>
            <input.TextArea {...register("description")} rows={5} />
          </input.InputGroup>

          <input.InputGroup>
            <input.Label>Color</input.Label>
            <SwatchesPicker
              {...register("color", { required: true })}
              color={color}
              onChange={(color) => setValue("color", color.hex)}
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

namespace s {
  export const Home = styled("div", {
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    padding: "$4",
    alignItems: "center",
    gap: "$4",
    overflow: "auto",
  });

  export const Tasks = styled("div", {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "$4",
  });

  export const Error = styled("span", {
    color: "$danger",
    fontSize: "$sm",
  });
}
