import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Label } from "@/components/shadcn/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { useQuestionsStore } from "@/store/initial-test";
import { type Question as QuestionType } from "@/types/Question";

export default function Question({ info }: { info: QuestionType }) {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleCLick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <>
      <CardHeader>
        <CardTitle>{info.question}</CardTitle>
        <CardDescription>{info.text}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
          {info.answers.map((answer, index) => (
            <>
              <div key={index}>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                  disabled={info.userSelectedAnswer != null}
                  onClick={createHandleCLick(index)}
                />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mb-3 h-6 w-6"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                  {answer}
                </Label>
              </div>
            </>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue</Button>
      </CardFooter>
    </>
  );
}
