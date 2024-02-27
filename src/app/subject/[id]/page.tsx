'use client'

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { LucidePlusCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Subject() {
  const { id } = useParams<{ id: string }>();
  const { data } = api.subject.getById.useQuery({ subjectId: id })

  return (
    <main className="p-10">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{data?.name} - flash cards</h1>

        <Link
          href={`/flash-cards/new?subjectId=${id}`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "flex items-center gap-2 bg-purple-950 hover:bg-purple-900",
          )}
        >
          <LucidePlusCircle className="size-4" />
          Adicionar flash card
        </Link>
      </header>
    </main>
  );
}
