'use client'

import { NewSubject } from "@/components/common/new-subject";
import { SubjectList } from "@/components/common/subject-list";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

export default function Course() {
  const { id } = useParams<{ id: string }>();
  const { data } = api.course.getById.useQuery({ courseId: id })

  return (
    <main className="p-10">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{data?.name} - conteúdos</h1>

        <NewSubject />
      </header>

      <SubjectList subjects={data?.Subject ?? []} />
    </main>
  );
}
