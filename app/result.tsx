import React from "react";
import { ResultType } from "./useAsk";

type Props = {
  question: string;
  result: ResultType;
  onAskChatGpt: (question: string, prompt: string) => void;
  isLoading: boolean;
};

export default function Result({
  question,
  result,
  onAskChatGpt,
  isLoading,
}: Props) {
  const onAskKeyword = (keyword: string) => {
    const subject = result.subject;
    const prompt = `موضوع ${keyword} در ${subject} است
     توضیح در مورد موضوع  بصورت description بنویس 
          و لیستی از کلمات کلیدی مرتبط به موضوع را بصورت keywords بنویس
          و لیستی از سوالاتی که میتونه در درک آن کمک کنه رو بصورت questions بنویس
          نتیجه رو به شکل زیر بنویس :
          {"description":"this is description","subject":"subject","keywords":["key1","key2",...],"questions":["q1","q2",...]}`;

    onAskChatGpt(keyword, prompt);
  };

  const onAskQuestion = (question: string) => {
    const prompt = ` با توجه به سوال ${question} 
    توضیح در مورد موضوع سوال بصورت description بنویس 
          موضوع سوال را بصورت subject بنویس
          و لیستی از کلمات کلیدی مرتبط به موضوع سوال را بصورت keywords بنویس
          و لیستی از سوالاتی که میتونه در درک آن کمک کنه رو بصورت questions بنویس
          نتیجه رو به شکل زیر بنویس :
          {"description":"this is description","subject":"subject","keywords":["key1","key2",...],"questions":["q1","q2",...]}
    `;
    onAskChatGpt(question, prompt);
  };

  return (
    <div className="flex flex-col gap-8 p-4 bg-white rounded-lg ">
      <h4 className="text-primary">
        <span className="font-bold text-black">سوال :</span> {question}
      </h4>
      {result && (
        <>
          <p className="text-secondary">
            <span className="text-black font-bold">توضیحات :</span>{" "}
            {result.description}
          </p>
          <div>
            <span className="text-black font-bold ">سوالات مشابه </span>
            <div className="flex flex-col gap-3 mt-3">
              {result.questions.map((q) => {
                return (
                  <a role="button" onClick={() => onAskQuestion(q)} key={q}>
                    {q} <span className="text-xs text-gray-400"> بپرس</span>
                  </a>
                );
              })}
            </div>
          </div>
          <div>
            <span className="text-black font-bold mb-3">
              کلمات کلیدی :{" "}
              <small className="text-xs text-gray-400">بپرس</small>
            </span>
            <div className="flex gap-2 py-3">
              {result.keywords.map((q) => {
                return (
                  <small
                    role="button"
                    onClick={() => onAskKeyword(q)}
                    className="badge badge-lg badge-accent"
                    key={q}
                  >
                    {q}
                  </small>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
