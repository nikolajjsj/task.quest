import { createRouter } from "./context";
import superjson from "superjson";

import { taskRouter } from "./task";
import { authRouter } from "./auth";
import { projectRouter } from "./project";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("task.", taskRouter)
  .merge("project.", projectRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
