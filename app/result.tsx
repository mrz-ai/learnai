import React from "react";
import { ResultType } from "./useAsk";

type Props = {
  question: string;
  result: ResultType;
};

export default function Result({ question, result }: Props) {
  return (
    <div>
      <h4>سوال : {question}</h4>
      {result && (
        <>
          <p>{result.summary}</p>
          <ul>
            {result.questions.map((q) => {
              return <li key={q}>{q}</li>;
            })}
          </ul>
          <div className="flex gap-2 py-3">
            {result.keywords.map((q) => {
              return (
                <small className="badge badge-lg badge-accent" key={q}>
                  {q}
                </small>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
