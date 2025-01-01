import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  // 아래의 경우 불안정하여 SQL injection에 노출 될 수 있음
  // return db.prepare("SELECT * FROM meals WHERE slug = " + slug);
  return db.prepare("SELECT * FROM meals WH ERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  console.log("meal->", meal);

  const extension = meal.image.name.split(".").pop(); // 확장자
  const fileName = `${meal.slug}.${extension}`;

  // 파일에 데이터를 쓸 수 있도록하는 stream 생성
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  // argument: 저장 할 파일, write를 마치면 실행 될 함수
  stream.write(Buffer.from(bufferedImage), (error) => {
    // 정상적으로 동작 시 error는 null로 받음

    if (error) {
      throw new Error("이미지 저장에 실패하였습니다.");
    }
  });

  // 모든 이미지에 대한 요청은 자동적으로 public 폴더로 보내짐. 따라서 public 제거
  meal.image = `/images/${fileName}`;

  db.prepare(
    `
      INSERT INTO meals
      (title, summary, instruction, creator, creator_email, image, slug)
      VALUES (
        @title,
        @summary,
        @instructions,
        @creator,
        @creator_email,
        @image,
        @slug
  )
    `
  ).run(meal);
  // ${} 이런식으로 직접 값을 넣으면 sql injection에 취약하므로 better-sqlite가 제공하는 방식으로
  // 필드의 이름으로 특정 필드와 연결하여 각 필드에 맞는 데이터가 추출됨
}
24;
