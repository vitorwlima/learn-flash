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

export const CourseList: React.FC = () => {
  const { data } = api.course.getAll.useQuery();

  return (
    <ul className="space-y-4">
      {data?.map((course) => (
        <li key={course.id}>
          <Link href={`/course/${course.id}`}>
            <Card className="flex items-center justify-between border-transparent bg-purple-600 p-6 text-white transition-opacity hover:opacity-90">
              <CardHeader className="p-0">
                <CardTitle>{course.name}</CardTitle>
                <CardDescription className="text-stone-300">
                  {course._count.Subject === 1
                    ? "1 conteúdo"
                    : `${course._count.Subject} conteúdos`}
                </CardDescription>
              </CardHeader>
              <LucideChevronRight className="size-4" />
            </Card>
          </Link>
        </li>
      ))}
    </ul>
  );
};
