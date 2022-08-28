import Link from "next/link";
import { useRouter } from "next/router";

import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  avaliableAt: Date;
  type: "live" | "class";
}

export function Lesson(data: LessonProps) {
  const router = useRouter();
  const { slug } = router.query;

  const isLessonAvailable = isPast(data.avaliableAt);
  const availableDateFormatted = format(
    data.avaliableAt,
    "EEEE '•' d ' de 'MMMM '•' h'h'mm",
    {
      locale: ptBR,
    }
  );

  const isActiveLesson = slug === data.slug;

  return (
    <a href={`/event?slug=${data.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                "text-sm font-medium flex items-center gap-2",
                {
                  "text-blue-500": !isActiveLesson,
                  "text-white": isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} className="mt-[-5px]" />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} className="mt-[-5px]" />
              Em breve
            </span>
          )}

          <span
            className={classNames(
              "text-xs rounded px-2 py-[0.125rem] border font-bold",
              {
                "text-green-300 border-green-300": !isActiveLesson,
                "text-white border-white": isActiveLesson,
              }
            )}
          >
            {data.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={classNames("mt-5 block", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {data.title}
        </strong>
      </div>
    </a>
  );
}
