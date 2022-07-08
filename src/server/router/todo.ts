import { createRouter } from "./context";
import { z } from "zod";

export const todoRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany({
        where: { userId: ctx.session?.id as string },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      description: z.string().nullish(),
      date: z.date().nullish(),
      color: z.string(),
      tag: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return;
      return await ctx.prisma.todo.create({
        data: { ...input, userId },
      });
    },
  });
