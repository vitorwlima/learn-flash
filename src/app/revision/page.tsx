"use client";

import { api } from "@/trpc/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { LucideArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RevisionPage() {
  const { data } = api.card.getAll.useQuery();
  const shuffledCards = data
    ?.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value) ?? [];
  const [currentCard, setCurrentCard] = useState(0);

  const card = shuffledCards[currentCard]!;

  const handleGoNext = () => {
    if (currentCard === shuffledCards.length - 1) return;
    setCurrentCard((prev) => prev + 1);
  };

  const handleGoPrevious = () => {
    if (currentCard === 0) return;
    setCurrentCard((prev) => prev - 1);
  };

  return (
    <main className="p-10">
      <header className="mb-10">
        <h1 className="text-2xl font-bold">Revisar</h1>
      </header>

      {shuffledCards.length > 1 ? (
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value={card.id}>
              <AccordionTrigger className="font-bold">
                {card.question}
              </AccordionTrigger>
              <AccordionContent>{card.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>

          <footer className="mt-10 flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handleGoPrevious}
              disabled={currentCard === 0}
            >
              Anterior
            </Button>
            <Button
              className="flex items-center gap-2 bg-purple-950 hover:bg-purple-900"
              onClick={handleGoNext}
              disabled={currentCard === shuffledCards.length - 1}
            >
              Próximo
              <LucideArrowRight className="size-4" />
            </Button>
          </footer>
        </div>
      ) : (
        <p>Nenhum flash card criado. Crie um flash card para revisar.</p>
      )}
    </main>
  );
}
