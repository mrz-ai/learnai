"use client";
import { ReactElement, useState } from "react";
import Form from "./form";
import { ResultType } from "./useAsk";
import Result from "./result";

export default function Home() {
  const [results, setResults] = useState<ReactElement[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onAskChatGptHandler = (question: string, prompt: string) => {
    console.log("prompt is:", prompt);
    setIsLoading(true);
    fetch("/api/question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    })
      .then((response) => {
        console.log("response is:", response);
        // if (!response.ok) {
        //   throw new Error(response.statusText);
        // }
        return response.json();
      })
      .then((data) => {
        console.log("data is:", data);
        if (!data) {
          return;
        }

        onShowResultHandler(question, data);
      })
      .catch((e) => {
        console.log("error is:", e);
        setError(e.message);
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

    setResults((c) => [...c, newComponent]);
  };

  return (
    <div className="flex flex-col gap-6">
      <Form onAskChatGpt={onAskChatGptHandler} isLoading={isLoading} />
      <span>{error}</span>
      {results}
    </div>
  );
}
