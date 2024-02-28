import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const cardRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        subjectId: z.string(),
        question: z.string(),
        answer: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.auth.userId) {
        throw new Error("Not authenticated");
      }

      return ctx.db.card.create({
        data: {
          subjectId: input.subjectId,
          answer: input.answer,
          question: input.question,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    if (!ctx.auth.userId) {
      throw new Error("Not authenticated");
    }

    return ctx.db.card.findMany({
      where: {
        subject: {
          course: {
            userId: ctx.auth.userId,
          },
        },
      },
    });
  }),
});
