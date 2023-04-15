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
  const [results, setResults] = useState<{ answer: string; title: string }[]>(
    []
  );

  const onAskChatGpt = (question: string) => {
    setIsLoading(true);
    const promot = createQustionsPromot(question);
    askAi(promot).then((res) => {
      const r = JSON.parse(res);
      r.map((it: any) => {
        const p = createParagraphPromot(it);
        askAi(p).then((jes) => {
          const t = JSON.parse(jes);
          setResults((c) => [...c, { answer: jes.answer, title: jes.title }]);
        });
      });
    });

    // Promise.all([
    //   askAi(promot).then((result) => {
    //     result.map((p: string) => {
    //       const s = createParagraphPromot(p);
    //       return askAi(s).then((res: { answer: string; title: string }) => {
    //         setResults((c) => [...c, { answer: res.answer, title: res.title }]);
    //       });
    //     });
    //   }),
    // ])
    //   .catch((e) => setError(e))
    //   .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <Form onAskChatGpt={onAskChatGpt} isLoading={isLoading} />
      <strong>{error}</strong>
      <div className="overflow-auto flex flex-col gap-4 whitespace-pre-wrap">
        {results.map((it) => {
          return <Result key={it.title} {...it} />;
        })}
      </div>
    </div>
  );
};

export default Home;
