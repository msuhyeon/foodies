import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  // 아래의 경우 불안정하여 SQL injection에 노출 될 수 있음
  // return db.prepare("SELECT * FROM meals WHERE slug = " + slug);
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}
