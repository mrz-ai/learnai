"use client";
import { ReactElement, useState } from "react";
import Form from "./form";
import { ResultType } from "./useAsk";
import Result from "./result";

export default function Home() {
  const [results, setResults] = useState<ReactElement[]>([]);

  const onShowResultHandler = (question: string, result: ResultType) => {
    const newComponent = (
      <Result question={question} result={result} key={question} />
    );
    setResults((c) => [...c, newComponent]);
  };

  return (
    <div className="flex flex-col gap-8 w-full justify-stretch items-stretch pt-12 px-48">
      <div className="flex flex-col items-center justify-center px-4 py-2">
        <h4 className=" font-bold">میخوای در مورد موضوعی بدانی</h4>
        <small className="mt-3 ">
          موضوع رو بگو
          <span className="font-bold text-blue-600"> هوش مصنوعی کمک میکنه</span>
        </small>
      </div>
      <Form onShowResult={onShowResultHandler} />
      {results}
    </div>
  );
}
