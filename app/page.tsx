"use client";
import { useAsk, useAskStream } from "./useAsk";

export default function Home() {
  // const { result, isLoading, onChangeHandler, question } = useAskStream();
  const { result, isLoading, onChangeHandler, question } = useAsk();

  return (
    <div className="flex flex-col gap-8 w-full justify-stretch items-stretch pt-12 px-48">
      <div className="flex flex-col items-center justify-center px-4 py-2">
        <h4 className=" font-bold">میخوای در مورد موضوعی بدانی</h4>
        <small className="mt-3 ">
          موضوع رو بگو
          <span className="font-bold text-blue-600"> هوش مصنوعی کمک میکنه</span>
        </small>
      </div>
      <div className="flex gap-2">
        {/* <textarea /> */}
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
      {/* <span className="border rounded-md p-4 flex-auto">{result}</span> */}
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
