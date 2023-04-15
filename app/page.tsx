"use client";
import { useState } from "react";
import Form from "./form";
import { useAsk, useAskStream } from "./useAsk";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const subject = useAsk();
  const betterQuestion = useAskStream();
  const description = useAskStream();
  const subjectQuestion = useAskStream();

  const onAskChatGpt = (question: string) => {
    setIsLoading(true);
    Promise.all([
      description.onChangeHandler(question),
      betterQuestion.onChangeHandler(question),
      subject
        .onChangeHandler(question)
        .then((result) => subjectQuestion.onChangeHandler(result + "")),
    ])
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <Form onAskChatGpt={onAskChatGpt} isLoading={isLoading} />
      <strong>{error}</strong>
      <div className="overflow-auto flex flex-col gap-4 whitespace-pre-wrap">
        <div className="flex flex-col gap-2">
          <strong>description :</strong>
          <small>{description.result}</small>
        </div>
        <div className="flex flex-col gap-2">
          <strong>better Questions :</strong>
          <small>{betterQuestion.result}</small>
        </div>
        <div className="flex flex-col gap-2">
          <strong>subject Questions :</strong>
          <small>{subjectQuestion.result}</small>
        </div>
      </div>
    </div>
  );
};

export default Home;
