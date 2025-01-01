"use client";

import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

// 마크업을 출력하고 고르는 과정을 처리하는 것
export default function ImagePicker({ label, name }) {
  console.log("label->", label);
  console.log("name->", name);

  // 선택된 이미지
  const [pickedImage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  // input 이벤트에 변화가 생길 때 마다 동작
  function handleImageChange(event) {
    // files 속성은 이 이벤트의 목적이 input 이기 때문에 존재함.
    // file input 속성은 시스템 내부에서 그런 files의 성질을  가지고있음

    // 사용자가 파일을 선택하면 event.target.files라는 배열 비슷한 데이터 안에 파일 정보들이 담김.
    const file = event.target.files[0];

    if (!file) {
      // 미리보기를 없애기 위함
      setPickedImage(null);
      return;
    }

    // 파일을 브라우저에서 보려면 Data URL이라는 포맷으로 변환해야함
    // FileReader: 파일을 읽어서 Data URL로 바꿔주는 것
    const fileReader = new FileReader();

    // 파일 읽기가 끝났을 때 실행될 함수
    fileReader.onload = () => {
      // 읽기가 완료되면 fileReader.result에 파일의 Data URL이 저장됨
      setPickedImage(fileReader.result);
    };

    // readAsDataURL: 파일을 Data URL로 변환하고 끝나면 위의 onload 함수 실행
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
          onChange={handleImageChange}
          required
          // multiple: 여러개 파일 선택 허용 시 추가
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
