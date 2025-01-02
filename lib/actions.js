// 이 파일내에서 정의하는 모든 함수가 Server Actions가 됨
"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || text.trim() == "";
}

// 이 함수는 자동적으로 제출한 formData를 받게되는데,
// form 안의 input 태그들에 의해 모인 데이터가 formData 객체로 수집된다.
// 자바스크립트에서 제공하는 FormData 클래스로!!
export async function shareMeal(formData) {
  //   "use server";
  // server action은 클라이언트 컴포넌트에서 사용할 수 없음
  // NextJS에서는 기본적으로 이를 명확하게 분리하는것이 불가능하기 떄문에 서버측 코드가 클라이언트 측에 위치에서 보안 문제 혹은 다른 문제가 생길 수 있다.
  // server action 생성: 서버에서만 실행될 수 있도록함

  // name 기반으로 가져옴
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
    // size가 0: 유효하지 않은 파일
  ) {
    throw new Error("Invalid input");
  }
  await saveMeal(meal);
  redirect("/meals");
}
