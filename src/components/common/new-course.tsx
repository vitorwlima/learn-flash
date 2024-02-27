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
import { useRef, useState } from "react";
import { toast } from "sonner";

export const NewCourse: React.FC = () => {
  const { mutate, isLoading } = api.course.create.useMutation();
  const utils = api.useUtils();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCourse = () => {
    mutate(
      { name: inputRef.current!.value },
      {
        onSuccess: () => {
          utils.course.getAll.invalidate();
          inputRef.current!.value = "";
          toast.success("Matéria adicionada com sucesso.");
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
          Adicionar matéria
        </Button>
      </DialogTrigger>
      <DialogContent className="border-transparent bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <DialogHeader>
          <DialogTitle>Nova matéria</DialogTitle>

          <DialogDescription className="text-stone-400">
            Nova matéria para adicionar à lista.
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
            onClick={handleAddCourse}
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
