import Link from "next/link";

import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

interface LessonProps {
  title: string;
  slug: string;
  avaliableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, slug, avaliableAt, type }: LessonProps) {
  const isLessonAvailable = isPast(avaliableAt);
  const availableDateFormatted = format(
    avaliableAt,
    "EEEE '•' d ' de 'MMMM '•' h'h'mm",
    {
      locale: ptBR,
    }
  );

  return (
    <a href={`/event?slug=${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div className="rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500">
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
              <CheckCircle size={20} className="mt-[-5px]" />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} className="mt-[-5px]" />
              Em breve
            </span>
          )}

          <span className="text-xs rounded px-2 py-[0.125rem] text-green-300 border border-green-300 font-bold">
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong className="text-gray-200 mt-5 block">{title}</strong>
      </div>
    </a>
  );
}
