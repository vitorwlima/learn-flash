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
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            Subject: {
              where: {
                course: {
                  userId: ctx.auth.userId,
                },
              },
            },
          },
        },
      },
    });
  }),

  getById: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new Error("Not authenticated");
      }

      return ctx.db.course.findFirst({
        where: {
          id: input.courseId,
          userId: ctx.auth.userId,
        },
        select: {
          id: true,
          name: true,
          Subject: {
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
          },
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
