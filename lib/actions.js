// 이 파일내에서 정의하는 모든 함수가 Server Actions가 됨
"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
  return !text || text.trim() == "";
}

// 이 함수는 자동적으로 제출한 formData를 받게되는데,
// form 안의 input 태그들에 의해 모인 데이터가 formData 객체로 수집된다.
// 자바스크립트에서 제공하는 FormData 클래스로!!
export async function shareMeal(prevState, formData) {
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
    return {
      message: "다시 입력해주세요!!!!",
    };
  }
  await saveMeal(meal);

  // NextJS는 SSR이라 동적으로 데이터가 추가 될 경우에 캐싱된 페이지를 보여주게되어
  // 추가된 데이터가 보이지 않게됨 -> 캐싱된걸 지워야함

  // 보이지 않는이유.
  // public/ 폴더는 빌드 시점에 알고 있는 정적 파일들(이미지, 폰트 등)을 저장하기 위한 곳!!!
  // 빌드 시 이 파일들은 .next/ 디렉토리로 복사되어 배포된다.
  // 사용자가 서비스 이용 중 업로드하는 파일들은 빌드 이후에 생성되는 파일들이다.
  // 이 파일들은 빌드된 .next/ 디렉토리에 포함되지 않기 때문에 Next.js의 정적 파일 서빙 메커니즘으로는 접근이 불가능하며
  // aws s3 같은 클라우드 스토리지 서비스를 이용하여 업로드된 파일의 url을 디비에 저장하여 관리
  // - 서버 용량 관리 용이, CDN을 이용하므로 빠른 전송 가능, 확장성 굳, 파일 백업 및 복구 용이

  // NextJS가 특정 path에 속하는 캐시의 유효성 재검사를 하게 한다.
  // meals 페이지에 방문하려고 하는데, 변화하는 데이터가 포함되어있다면
  // /meals 경로에 대하여 유효성 재검사를 하게한다.
  // 중첩 path는 영향을 받지 않으므로 각각 재검사해야함.
  // 하지만 두번째 인자에 page를 넣을경우 그 페이지만 재검사하고
  // layout을 넣을 경우 중첩된 모든 페이지를 재검사하게된다.
  // 쉽게 말해 그 페이지에 연관된 캐시를(캐싱된 페이지) 비우게됨!!!
  revalidatePath("/meals", "layout");

  //웹의 모든 페이지를 재검사 하고 싶으면
  //revalidatePath("/", "layout");

  redirect("/meals");
}
