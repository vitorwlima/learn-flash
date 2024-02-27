"use client";

import { api } from "@/trpc/react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LucideChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export const SubjectList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = api.subject.getAll.useQuery({ courseId: id })

  return (
    <ul className="space-y-4">
      {data?.length ? (
        data.map((subject) => (
          <li key={subject.id}>
            <Link href={`/subject/${subject.id}`}>
              <Card className="flex items-center justify-between border-transparent bg-purple-600 p-6 text-white transition-opacity hover:opacity-90">
                <CardHeader className="p-0">
                  <CardTitle>{subject.name}</CardTitle>
                  <CardDescription className="text-stone-300">
                    {subject._count.Card === 1
                      ? "1 conteúdo"
                      : `${subject._count.Card} flash cards`}
                  </CardDescription>
                </CardHeader>
                <LucideChevronRight className="size-4" />
              </Card>
            </Link>
          </li>
        ))
      ) : (
        <p className="text-center text-sm text-stone-300">
          Nenhum conteúdo criada. Comece agora no botão acima.
        </p>
      )}
    </ul>
  );
};
