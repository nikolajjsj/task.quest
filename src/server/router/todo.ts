import { createRouter } from "./context";
import { z } from "zod";

export const todoRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return [];

      return await ctx.prisma.todo.findMany({
        where: { userId: ctx.session?.id as string },
      });
    },
  })
  .query("getOther", {
    async resolve({ ctx }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return [];

      return await ctx.prisma.todo.findMany({
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
      return await ctx.prisma.todo.create({ data: { ...input, userId } });
    },
  })
  .mutation("delete", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.delete({ where: { id: input } });
    },
  });
