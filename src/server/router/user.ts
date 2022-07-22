import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  .query("get", {
    input: z.string(),
    async resolve({ ctx, input: id }) {
      return await ctx.prisma.user.findFirst({ where: { id } });
    },
  })
  .query("search", {
    input: z.string(),
    async resolve({ ctx, input: query }) {
      return await ctx.prisma.user.findMany({ where: { name: query } });
    },
  });
