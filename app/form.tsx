import React, { useRef, useState } from "react";
import { ResultType, useAsk } from "./useAsk";

type Props = {
  onShowResult: (question: string, result: ResultType) => void;
};

export default function Form({ onShowResult }: Props) {
  const { isLoading, onChangeHandler, question } = useAsk({
    onResult: onShowResult,
  });

  return (
    <div className="flex gap-2">
      <input
        className="input input-bordered flex-auto"
        type="text"
        placeholder="موضوع"
        ref={question}
      />
      <button
        className={`btn btn-primary ${isLoading ? "loading" : ""} self-start`}
        onClick={onChangeHandler}
      >
        بپرس
      </button>
    </div>
  );
}
