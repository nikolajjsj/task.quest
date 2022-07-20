import { createRouter } from "./context";
import { z } from "zod";
import { TaskStatus } from "@prisma/client";

const TASK_INPUT = z.object({
  projectId: z.string().nullish(),
  title: z.string(),
  description: z.string().nullish(),
  date: z.date().nullish(),
  color: z.string(),
  tag: z.string().nullish(),
  status: z.nativeEnum(TaskStatus).default("TODO"),
  priority: z.boolean().default(false),
  pinned: z.boolean().default(false),
});

export const taskRouter = createRouter()
  .query("get", {
    input: z.string(),
    async resolve({ ctx, input: id }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return;
      return await ctx.prisma.task.findFirst({
        where: { id, userId },
        include: { user: true },
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return [];

      return await ctx.prisma.task.findMany({
        where: { userId: ctx.session?.id as string },
      });
    },
  })
  .query("getOther", {
    async resolve({ ctx }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return [];

      return await ctx.prisma.task.findMany({
        where: { userId: ctx.session?.id as string, projectId: null },
      });
    },
  })
  .mutation("create", {
    input: TASK_INPUT,
    async resolve({ ctx, input }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return;
      return await ctx.prisma.task.create({ data: { ...input, userId } });
    },
  })
  .mutation("delete", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.delete({ where: { id: input } });
    },
  })
  .mutation("update", {
    input: TASK_INPUT.merge(z.object({ id: z.string() })),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.update({
        where: { id: input.id },
        data: { ...input },
        include: { user: true },
      });
    },
  });
