import { useRef } from "react";
import { FiSend } from "react-icons/fi";

type Props = {
  onAskChatGpt: (question: string) => void;
  isLoading: boolean;
};

export default function Form({ onAskChatGpt, isLoading }: Props) {
  const question = useRef<HTMLInputElement>(null);
  const onChangeHandler = () => {
    if (question.current?.value) {
      onAskChatGpt(question.current?.value);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onChangeHandler;
      }}
      className="flex gap-2 relative"
    >
      <input
        className="input input-bordered flex-auto"
        type="text"
        placeholder="Ask from AI ..."
        ref={question}
      />
      <FiSend
        role="button"
        size={22}
        color="gray"
        className="absolute right-3 top-3"
        onClick={() => onChangeHandler()}
      />
    </form>
  );
}
