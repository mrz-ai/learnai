"use client";
import { ReactElement, useState } from "react";
import Form from "./form";
import { ResultType } from "./useAsk";
import Result from "./result";

export default function Home() {
  const [results, setResults] = useState<ReactElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const onAskChatGptHandler = (question: string, chatQuestion: string) => {
    setIsLoading(true);
    fetch("/api/sub", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: chatQuestion,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          return;
        }
        console.log("this is data recive from chatgpt", data);

        onShowResultHandler(question, data);
        // setResult(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onShowResultHandler = (question: string, result: ResultType) => {
    const newComponent = (
      <Result
        question={question}
        result={result}
        key={question}
        isLoading={isLoading}
        onAskChatGpt={onAskChatGptHandler}
      />
    );
    console.log(question, result);

    setResults((c) => [...c, newComponent]);
  };

  return (
    <div className="flex flex-col gap-6">
      <Form onAskChatGpt={onAskChatGptHandler} isLoading={isLoading} />
      {results}
    </div>
  );
}
