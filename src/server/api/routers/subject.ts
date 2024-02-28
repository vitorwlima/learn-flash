import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const subjectRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ subjectId: z.string() }))
    .query(({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new Error("Not authenticated");
      }

      return ctx.db.subject.findFirst({
        where: {
          id: input.subjectId,
        },
        select: {
          id: true,
          name: true,
          Card: {
            select: {
              id: true,
              question: true,
              answer: true,
            }
          }
        },
      });
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), courseId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new Error("Not authenticated");
      }

      return ctx.db.subject.create({
        data: {
          courseId: input.courseId,
          name: input.name,
        },
      });
    }),
});
