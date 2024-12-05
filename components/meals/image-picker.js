"use client";

import { useRef, useState } from "react";

import classes from "./image-picker.module.css";
import Image from "next/image";

// 마크업을 출력하고 고르는 과정을 처리하는 것
export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    // 유저가 파일을 선태가지 않은 경우
    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    console.log("file->", file);

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      {/* label을 input에 연결시킬 수 있게함. #name에 label을 연결 */}
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>이미지가 선택되지 않았습니다.</p>}
          {pickedImage && (
            // 이미지의 크기를 미리 알 수 없으니 fill 속성 추가
            <Image src={pickedImage} alt="유저에게 선택 된 이미지" fill />
          )}
        </div>
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
          required
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
