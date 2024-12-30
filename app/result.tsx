import React from "react";

type Props = {
  title: string;
  answer: string;
};

export default function Result({ answer, title }: Props) {
  return (
    <div className="flex flex-col gap-8 p-4 bg-white rounded-lg ">
      <h4 className="text-primary">
        <span className="font-bold text-black">{title}</span>
      </h4>
      <small className="whitespace-pre-wrap">{answer}</small>
    </div>
  );
}
