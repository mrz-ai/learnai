"use client";
import { useState } from "react";
import Form from "./form";
import {
  askAi,
  createParagraphPromot,
  createQustionsPromot,
  useAskStream,
} from "./useAsk";
import Result from "./result";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [results, setResults] = useState<{ answer: string; title: string }[]>(
  //   []
  // );
  const { onChangeHandler, result } = useAskStream();

  const onAskChatGpt = (question: string) => {
    setIsLoading(true);
    onChangeHandler(question)
      .catch((er) => setError(er))
      .finally(() => setIsLoading(false));
    // const promot = createQustionsPromot(question);
    // askAi(promot).then((str) => {
    //   const sentences = [];
    //   let startIndex = 0;

    //   for (let i = 0; i < str.length; i++) {
    //     if (str[i] === "@") {
    //       startIndex = i;
    //     } else if (str[i] === "#") {
    //       const sentence = str.slice(startIndex + 1, i);
    //       sentences.push(sentence);
    //     }
    //   }

    //   console.log(sentences);

    //   // const r = JSON.parse(res);
    //   // r.map((it: any) => {
    //   //   const p = createParagraphPromot(it);
    //   //   askAi(p).then((jes) => {
    //   //     const t = JSON.parse(jes);
    //   //     setResults((c) => [...c, { answer: jes.answer, title: jes.title }]);
    //   //   });
    //   // });
    // });
  };

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <Form onAskChatGpt={onAskChatGpt} isLoading={isLoading} />
      <strong>{error}</strong>
      <div className="overflow-auto flex flex-col gap-4 whitespace-pre-wrap mb-4">
        <span className="whitespace-pre-wrap">{result}</span>
        {/* {results.map((it) => {
          return <Result key={it.title} {...it} />;
        })} */}
      </div>
    </div>
  );
};

export default Home;
