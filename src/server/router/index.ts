import { createRouter } from "./context";
import superjson from "superjson";

import { todoRouter } from "./todo";
import { authRouter } from "./auth";
import { projectRouter } from "./project";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("todo.", todoRouter)
  .merge("project.", projectRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
