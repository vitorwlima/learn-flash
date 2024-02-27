import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const subjectRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(({ input, ctx }) => {
      if (!ctx.auth.userId) {
        throw new Error("Not authenticated");
      }

      return ctx.db.subject.findMany({
        where: {
          courseId: input.courseId,
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              Card: {
                where: {
                  subject: {
                    courseId: input.courseId,
                  },
                },
              },
            },
          },
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
