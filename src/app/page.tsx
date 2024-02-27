import { CourseList } from "@/components/common/course-list";
import { NewCourse } from "@/components/common/new-course";

export default function Home() {
  return (
    <main className="p-10">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Minhas matérias</h1>

        <NewCourse />
      </header>

      <CourseList />
    </main>
  );
}
