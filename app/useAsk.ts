import { useState } from "react";

export const useAskStream = () => {
  const [result, setResult] = useState<string>("");

  const onChangeHandler = async (question: string) => {
    if (question) {
      setResult("");

      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: question,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setResult((prev) => prev + chunkValue);
      }
    }
  };

  return { result, onChangeHandler };
};

export const askAi = (question: string) => {
  return fetch("/api/question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: question,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
};

export const createQustionsPromot = (question: string) => {
  return `this is user question : '${question}', list promots for ask from ai about that and write list like
  this json format : ["q1",...]`;
};

export const createParagraphPromot = (question: string) => {
  return `${question} , write subject of the question as title and answert like
  this json format : {"title":"title","answer":"this is answer"}`;
};
