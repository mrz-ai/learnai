import { useRef } from "react";
import { FiSend } from "react-icons/fi";
import { CgSpinnerTwo } from "react-icons/cg";

type Props = {
  onAskChatGpt: (question: string) => void;
  isLoading: boolean;
};

export default function Form({ onAskChatGpt, isLoading }: Props) {
  const question = useRef<HTMLTextAreaElement>(null);
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
      <textarea
        className="textarea textarea-bordered flex-auto"
        defaultValue="I want to learn "
        ref={question}
      />
      <div className="absolute right-3 top-3">
        {isLoading ? (
          <CgSpinnerTwo size={22} color="gray" className="animate-spin" />
        ) : (
          <FiSend
            role="button"
            size={22}
            color="gray"
            onClick={() => onChangeHandler()}
          />
        )}
      </div>
    </form>
  );
}
