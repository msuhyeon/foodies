import Image from "next/image";

import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import { notFound } from "next/navigation";

export default function MealsDetail({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {/* 모든 식사에 저장돼 있는 설명서 출력 
        HTML 코드로 출력되어야해서 dangerouslySetInnerHTML 요소에 타겟팅
        컨텐츠를 HTML로 출력 시 크로스 사이트 스크립트(XSS) 공격에 노출되기 때문에 검증 필요 */}
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
