"use client";

import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css";
import { shareMeal } from "@/lib/actions";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import { useFormState } from "react-dom";
// import { useActionState } from "react";

export default function ShareMealPage() {
  // 폼이 제출될 때 동작하는 실제 서버액션, 컴포넌트의 초기 상태 => 서버액션으로 부터 아직 응답을 못받았을때 할당되어야할 초기값
  const [state, formAction] = useFormState(shareMeal, {
    message: null,
  });
  // const [state, formAction] = useActionState(shareMeal, {
  //   message: null,
  // });

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {/* 이 form이 제출되면 NextJS가 자동으로 요청을 생성하여 웹사이트를 제공하는
        NextJS 서버로 보냄 -> action에 정의해둔 함수가 실행되고 -> form의 제출을 서버에서 제어함 === 함수는 서버에서 실행됨   */}
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message} </p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
