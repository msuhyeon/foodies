"use client";

import { useRef, useState } from "react";

import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {};
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      {/* #name에 label을 연결 */}
      <label htmlFor={name}>{label}</label>
      <div classNAme={classes.controls}>
        {/* accept: 사용자가 선택할 수 있는 파일 유형 제한 */}
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          //   multiple:  여러개 파일 선택 허용 시 추가
          onChange={handleImageChange}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}
