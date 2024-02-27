"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { LucidePlusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const NewSubject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mutate, isLoading } = api.subject.create.useMutation();
  const utils = api.useUtils();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddSubject = () => {
    mutate(
      { name: inputRef.current!.value, courseId: id },
      {
        onSuccess: () => {
          utils.subject.getAll.invalidate({ courseId: id });
          inputRef.current!.value = "";
          toast.success("Conteúdo adicionada com sucesso.");
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-purple-950 hover:bg-purple-900">
          <LucidePlusCircle className="size-4" />
          Adicionar conteúdo
        </Button>
      </DialogTrigger>
      <DialogContent className="border-transparent bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <DialogHeader>
          <DialogTitle>Novo conteúdo</DialogTitle>

          <DialogDescription className="text-stone-400">
            Novo conteúdo para adicionar à lista.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Input
            className="border-purple-900 placeholder:text-stone-400"
            placeholder="Nome"
            ref={inputRef}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button
            className="bg-purple-950 hover:bg-purple-900"
            disabled={isLoading}
            onClick={handleAddSubject}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
