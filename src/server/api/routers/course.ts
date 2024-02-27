import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const courseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new Error("Not authenticated");
    }

    return ctx.db.course.findMany({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new Error("Not authenticated");
      }

      return ctx.db.course.create({
        data: {
          userId: ctx.auth.userId,
          name: input.name,
        },
      });
    }),
});
