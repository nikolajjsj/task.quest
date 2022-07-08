import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Button } from "../components/common/common";
import {
  Form,
  Input,
  InputGroup,
  Label,
  TextArea,
} from "../components/common/inputs";
import { TaskCard } from "../components/TaskCard";
import { styled } from "../styles/stitches.config";
import { trpc } from "../utils/trpc";
import { SwatchesPicker } from "react-color";
import { useQueryClient } from "react-query";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "../components/common/dialog";
import { BiAddToQueue } from "react-icons/bi";

type Inputs = {
  title: string;
  description?: string;
  tags: string;
  color: string;
  date?: Date;
};

const Home: NextPage = () => {
  const [taskDialog, setTaskDialog] = useState<boolean>(false);
  const { data } = trpc.useQuery(["todo.getAll"]);

  return (
    <s.Home>
      <Button onClick={() => setTaskDialog((val) => !val)}>
        <BiAddToQueue size={30} />
      </Button>

      <s.Tasks>
        {data?.map((todo) => (
          <TaskCard key={todo.id} task={todo} />
        ))}
      </s.Tasks>

      {taskDialog && <TaskDialog onClose={() => setTaskDialog(false)} />}
    </s.Home>
  );
};
export default Home;

const TaskDialog = ({ onClose }: { onClose: () => void }) => {
  const v = useQueryClient();
  const mut = trpc.useMutation(["todo.create"], {
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
    <Dialog
      title="New task"
      maxHeight="lg"
      onClose={onClose}
      closeOnClickOutside
      closeOnEsc
    >
      <Form onSubmit={handleSubmit((data) => mut.mutate(data))}>
        <DialogContent css={{ gap: "$8" }}>
          <InputGroup>
            <Label>Title</Label>
            <Input {...register("title", { required: true })} />
            {errors.title && <s.Error>Title is required</s.Error>}
          </InputGroup>

          <InputGroup>
            <Label>Description</Label>
            <TextArea {...register("description")} rows={5} />
          </InputGroup>

          {/* <s.InputGroup>
          <s.Label>Tags</s.Label>
          <s.Input {...register("tags")} />
        </s.InputGroup> */}

          <InputGroup>
            <Label>Color</Label>
            <SwatchesPicker
              {...register("color", { required: true })}
              color={color}
              onChange={(color) => setValue("color", color.hex)}
            />
          </InputGroup>

          {/* <s.Input
          {...register("date")}
          type="date"
          defaultValue={new Date().toISOString()}
        /> */}
        </DialogContent>

        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </Form>
    </Dialog>
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
    display: "flex",
    flexDirection: "column",
    gap: "$4",
  });

  export const Error = styled("span", {
    color: "$danger",
    fontSize: "$sm",
  });
}
