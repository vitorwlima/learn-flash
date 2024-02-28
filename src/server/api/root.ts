import { courseRouter } from "@/server/api/routers/course";
import { createTRPCRouter } from "@/server/api/trpc";
import { subjectRouter } from "./routers/subject";
import { cardRouter } from "./routers/card";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  course: courseRouter,
  subject: subjectRouter,
  card: cardRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
