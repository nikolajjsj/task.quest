import { createRouter } from "./context";
import { z } from "zod";

export const todoRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      description: z.string().nullish(),
      date: z.date().nullish(),
      color: z.string(),
      tag: z.string().nullish(),

      // userId      String
      // user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.todo.create({
        data: { ...input, userId: ctx.session?.user?.name! },
      });
    },
  });
