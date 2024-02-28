import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  cards: {
    id: string;
    question: string;
    answer: string;
  }[];
};

export const CardsList: React.FC<Props> = ({ cards }) => {
  return (
    <ul className="space-y-4">
      {cards.length ? (
        cards.map((card) => (
          <li key={card.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value={card.id}>
                <AccordionTrigger className="font-bold">
                  {card.question}
                </AccordionTrigger>
                <AccordionContent>{card.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        ))
      ) : (
        <p className="text-center text-sm text-stone-300">
          Nenhum flash card criado. Comece agora no botão acima.
        </p>
      )}
    </ul>
  );
};
