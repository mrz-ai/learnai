import React, { useRef } from "react";

type Props = {
  onAskChatGpt: (question: string, chatQuestion: string) => void;
  isLoading: boolean;
};

export default function Form({ onAskChatGpt, isLoading }: Props) {
  const question = useRef<HTMLInputElement>(null);
  const onChangeHandler = () => {
    const prompt = `'${question.current?.value ?? ""}'
          جمله بالا را در نظر بگیر و
          اگر جمله بالا عبارت سوالی هست
          توضیح کامل بصورت description بنویس 
          موضوع سوال را بصورت subject بنویس
          و لیستی از کلمات کلیدی مرتبط به سوال را بصورت keywords بنویس
          و لیستی از سوالاتی مشابه رو بصورت questions بنویس
          اگر جمله بالا یک موضوع هست 
          توضیح کامل در مورد موضوع  بصورت description بنویس 
          خود موضوع را بصورت subject بنویس
          و لیستی از کلمات کلیدی مرتبط به موضوع را بصورت keywords بنویس
          و لیستی از سوالاتی مشابه رو بصورت questions بنویس
          نتیجه رو به شکل زیر بنویس :
          {"description":"this is description","subject":"subject","keywords":["key1","key2",...],"questions":["q1","q2",...]}`;

    onAskChatGpt(question.current?.value ?? "", prompt);
  };
  return (
    <div className="flex gap-2">
      <input
        className="input input-bordered flex-auto"
        type="text"
        placeholder="موضوع"
        ref={question}
      />
      <button
        className={`btn btn-primary ${isLoading ? "loading" : ""} self-start`}
        onClick={onChangeHandler}
      >
        {!isLoading && <span>بپرس</span>}
      </button>
    </div>
  );
}
