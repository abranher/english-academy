import { useQuestionsStore } from "@/store/initial-test";
import Question from "../start/_components/Question";

export default function Test() {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviusQuestion = useQuestionsStore(
    (state) => state.goPreviusQuestion
  );

  const questionInfo = questions[currentQuestion];
  return (
    <>
      <Question info={questionInfo} />
    </>
  );
}
