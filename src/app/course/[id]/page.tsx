import { NewSubject } from "@/components/common/new-subject";
import { SubjectList } from "@/components/common/subject-list";

export default function Course() {
  return (
    <main className="p-10">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Meus conteúdos</h1>

        <NewSubject />
      </header>

      <SubjectList />
    </main>
  );
}
