import { useRef, useState } from "react";

export const useAskStream = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const question = useRef<HTMLInputElement>(null);
  const onChangeHandler = async () => {
    if (question.current) {
      setIsLoading(true);
      setResult(null);

      const response = await fetch("/api/sub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `'${question.current.value}'
          if sentence is question write summary and keyword related to subject of question
          if sentence is not question write summary and list of some main question about it 
          write result like this :
          {"summary":"this is summary","keywords":["key1","key2",...],"questions":["q1","q2",...]}`,
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
      setIsLoading(false);
      question.current.value = "";
    }
  };

  return { result, isLoading, onChangeHandler, question };
};

type ResultType = {
  summary: string;
  keywords: string[];
  questions: string[];
};

export const useAsk = () => {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const question = useRef<HTMLInputElement>(null);
  const onChangeHandler = async () => {
    if (question.current) {
      setIsLoading(true);
      setResult(null);

      fetch("/api/sub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `'${question.current.value}'
          جمله بالا را در نظر بگیر و
          توضیح در مورد موضوع جمله بصورت summary بنویس 
          و لیستی از کلمات کلیدی مرتبط به موضوع سوال را بصورت keywords بنویس
          و لیستی از سوالاتی که میتونه در درک آن کمک کنه رو بصورت questions بنویس
          نتیجه رو به شکل زیر بنویس :
          {"summary":"this is summary","keywords":["key1","key2",...],"questions":["q1","q2",...]}`,
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
          setResult(data);
        })
        .finally(() => {
          setIsLoading(false);
          if (question.current) {
            question.current.value = "";
          }
        });
    }
  };

  return { result, isLoading, onChangeHandler, question };
};
