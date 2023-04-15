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

export const useAsk = () => {
  const onChangeHandler = async (question: string) => {
    if (question != "") {
      fetch("/api/sub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: question,
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
          return data;
        });
    }
  };

  return { onChangeHandler };
};

export const createQuestionSubjectPromot = (question: string) => {
  return `what is the main subject of this sentence : ${question} , please give short answer and just the subject`;
};

export const createQuestionBetterPromot = (question: string) => {
  return `if i ask question like this ${question} , list questions that you need to make better answer ,just write questions in json format like this : [{"q":"this is question",...}] `;
};

export const createSubjectSimillarQuestion = (subject: string) => {
  return `write list of question about '${subject}' , just write list in json format like this : [{"q":"this is question",...}]`;
};
