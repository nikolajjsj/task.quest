import { createRouter } from "../context";
import { z } from "zod";

export const projectRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return [];

      return await ctx.prisma.project.findMany({
        where: { userId: ctx.session?.id as string },
        include: { Task: true, user: true },
      });
    },
  })
  .query("get", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.findFirst({
        where: { id: input.id },
        include: { Task: true, user: true },
      });
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      description: z.string().nullish(),
      date: z.date().nullish(),
      color: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session?.id as string;
      if (userId == null) return;
      return await ctx.prisma.project.create({ data: { ...input, userId } });
    },
  })
  .mutation("delete", {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.project.delete({ where: { id: input } });
    },
  });
