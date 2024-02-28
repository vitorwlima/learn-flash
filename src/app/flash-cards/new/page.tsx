"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export default function NewFlashCardPage() {
  const params = useSearchParams();
  const subjectId = params.get("subjectId")!;
  const utils = api.useUtils();
  const router = useRouter()

  const questionRef = useRef<HTMLTextAreaElement>(null)
  const answerRef = useRef<HTMLTextAreaElement>(null)

  const { data } = api.subject.getById.useQuery({ subjectId });
  const { mutate } = api.card.create.useMutation()

  const handleSave = () => {
    if (!answerRef.current?.value || !questionRef.current?.value) {
      return
    }

    mutate({
      subjectId,
      question: questionRef.current.value,
      answer: answerRef.current.value
    }, {
      onSuccess: () => {
        toast.success('Flash card criado com sucesso.')
        utils.subject.getById.invalidate({ subjectId })
        router.push(`/subject/${subjectId}`)
      }
    })
  }

  return (
    <main className="p-10">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{data?.name} - New flash card</h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Textarea className="h-96 resize-none bg-muted text-center text-xl font-bold text-foreground" placeholder="Minha pergunta..." ref={questionRef}/>
        <Textarea className="h-96 resize-none bg-muted text-center text-xl text-foreground grid place-items-center" placeholder="Minha resposta..." ref={answerRef} />
      </div>

      <footer className="mt-10">
        <Button className="bg-purple-950 hover:bg-purple-900" onClick={handleSave}>Salvar</Button>
      </footer>
    </main>
  );
}
