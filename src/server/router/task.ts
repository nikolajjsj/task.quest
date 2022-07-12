import { createRouter } from "./context";
import { z } from "zod";

export const taskRouter = createRouter()
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
    input: z.object({
      projectId: z.string().nullish(),
      title: z.string(),
      description: z.string().nullish(),
      date: z.date().nullish(),
      color: z.string(),
      tag: z.string().nullish(),
    }),
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
  .mutation("toggle", {
    input: z.object({
      status: z
        .enum(["TODO", "INPROGRESS", "DONE", "CANCELLED"])
        .default("TODO"),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.update({
        where: { id: input.id },
        select: { status: true },
        data: { status: input.status },
      });
    },
  })
  .mutation("pin", {
    input: z.object({
      pinned: z.boolean(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.update({
        where: { id: input.id },
        select: { pinned: true },
        data: { pinned: input.pinned },
      });
    },
  });
