// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
// import { appRouter } from "../../../server/router";
// import { createContext } from "../../../server/router/context";
import { appRouter } from "@taskquest/api/src/routers/index";
import { createContext } from "@taskquest/api/src/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
      console.error("Something went wrong", error);
    }
  },
  batching: {
    enabled: true,
  },
});
