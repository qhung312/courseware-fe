import { useMutation, useQueryClient } from '@tanstack/react-query';
import _, { debounce } from 'lodash';
import { ChangeEvent, Dispatch, SetStateAction, memo, useCallback, useState } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';

import { Markdown } from '..';
import QuizSessionService from '../../service/quizSession.service';
import { QuestionType, type ConcreteQuestion, UserAnswer } from '../../types/question';
import { QuizStatus } from '../../types/quiz';
import { MULTIPLE_CHOICE_LABELS } from '../../utils/helper';
import Icon from '../Icon';

type InputAnswerProps = {
  status: QuizStatus;
  question: ConcreteQuestion;
  helpers: {
    stringAnswer: string;
    numberAnswer: number[];
    setStringAnswer: Dispatch<SetStateAction<string>>;
    setNumberAnswer: Dispatch<SetStateAction<number[]>>;
  };
};

const InputAnswer = memo(function Component({ status, question, helpers }: InputAnswerProps) {
  const { stringAnswer, numberAnswer, setNumberAnswer } = helpers;
  const params = useParams();
  const queryClient = useQueryClient();

  const answerMutation = useMutation({
    mutationFn: async ({
      sessionId,
      questionId,
      answer,
    }: {
      sessionId: string;
      questionId: string;
      answer: UserAnswer;
    }) => {
      const { data } = await QuizSessionService.saveAnswer(sessionId, questionId, answer);
      return data.payload;
    },
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries(['quiz', params.quizId, variables.sessionId]);
    },
  });

  const optimizedSetMultipleValueAnswer = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNumberAnswer((prevState) =>
        _.includes(prevState, Number(e.target.value))
          ? _.without(prevState, Number(e.target.value))
          : _.concat(prevState, Number(e.target.value))
      );
      debounce(
        () =>
          answerMutation.mutate({
            sessionId: params.sessionId as string,
            questionId: String(question.questionId),
            answer: {
              answerKeys: _.includes(numberAnswer, Number(e.target.value))
                ? numberAnswer.length === 1
                  ? undefined
                  : _.without(numberAnswer, Number(e.target.value))
                : _.concat(numberAnswer, Number(e.target.value)),
            },
          }),
        500
      )();
    },
    [setNumberAnswer, numberAnswer, answerMutation, params.sessionId, question.questionId]
  );

  switch (question.type) {
    case QuestionType.MULTIPLE_CHOICE_SINGLE_ANSWER:
      return (
        <div className='flex h-fit flex-col flex-wrap items-start justify-center gap-y-4'>
          {question.options?.map((option, index) => (
            <div
              key={`question-${question.questionId}-answer-${option.key}`}
              className='relative flex flex-row flex-nowrap items-center justify-center gap-x-2'
            >
              <div className='relative flex items-center'>
                <input
                  id={`question-${question.questionId}-answer-${option.key}`}
                  onChange={() => {
                    setNumberAnswer([option.key]);
                    debounce(
                      () =>
                        answerMutation.mutate({
                          sessionId: params.sessionId as string,
                          questionId: String(question.questionId),
                          answer: {
                            answerKeys: [option.key],
                          },
                        }),
                      500
                    )();
                  }}
                  disabled={status !== QuizStatus.ONGOING}
                  className={`${
                    status === QuizStatus.ONGOING
                      ? 'checked:bg-[#4285F4]'
                      : question.answerKeys?.includes(option.key)
                      ? 'checked:bg-[#49CCCF]'
                      : question.userAnswerKeys?.includes(option.key)
                      ? 'checked:bg-[#DB4437]'
                      : ''
                  }`}
                  style={{ borderRadius: '9999px' }}
                  type='checkbox'
                  name={`question-${question.questionId}`}
                  value={option.key}
                  multiple={status === QuizStatus.ENDED}
                  checked={
                    numberAnswer[0] === option.key ||
                    (status === QuizStatus.ENDED &&
                      question.answerKeys &&
                      question.answerKeys[0] === option.key)
                  }
                />
                <span className='absolute left-1/2 flex items-center justify-center'>
                  <span className='-ml-[100%] h-full text-xs md:text-base'>
                    {MULTIPLE_CHOICE_LABELS[index]}
                  </span>
                </span>
              </div>
              <label htmlFor={`question-${question.questionId}-answer-${option.key}`}>
                <Markdown className='text-sm md:text-base'>{option.description}</Markdown>
              </label>
            </div>
          ))}
        </div>
      );
    case QuestionType.MULTIPLE_CHOICE_MULTIPLE_ANSWERS:
      return (
        <div className='flex flex-col flex-wrap items-start justify-center gap-y-4'>
          {question.options?.map((option) => (
            <div
              key={`question-${question.questionId}-answer-${option.key}`}
              className='relative flex flex-row flex-nowrap items-center justify-center gap-x-2'
            >
              <div className='relative flex items-center'>
                <input
                  id={`question-${question.questionId}-answer-${option.key}`}
                  className={`${
                    status === QuizStatus.ONGOING
                      ? 'checked:bg-[#4285F4]'
                      : question.answerKeys?.includes(option.key)
                      ? 'checked:bg-[#49CCCF]'
                      : question.userAnswerKeys?.includes(option.key)
                      ? 'checked:bg-[#DB4437]'
                      : ''
                  }`}
                  disabled={status !== QuizStatus.ONGOING}
                  onChange={optimizedSetMultipleValueAnswer}
                  name={`question-${question.questionId}`}
                  type='checkbox'
                  multiple
                  value={option.key}
                  checked={
                    numberAnswer.includes(option.key) ||
                    (status === QuizStatus.ENDED && question.answerKeys?.includes(option.key))
                  }
                />
                <span className='absolute left-1/2 flex items-center justify-center'>
                  <span className='-ml-[100%] h-full text-xs md:text-base'>
                    {question.answerKeys?.includes(option.key) ? (
                      <Icon.Checkmark className='h-4 w-auto md:h-6' />
                    ) : question.userAnswerKeys?.includes(option.key) ? (
                      <Icon.XMark className='h-4 w-auto md:h-6' />
                    ) : null}
                  </span>
                </span>
              </div>
              <label htmlFor={`question-${question.questionId}-answer-${option.key}`}>
                <Markdown className='text-sm md:text-base'>{option.description}</Markdown>
              </label>
            </div>
          ))}
        </div>
      );
    case QuestionType.TEXT:
      return (
        <div
          key={`question-${question.questionId}-answer-field`}
          className='relative flex flex-row flex-nowrap items-center justify-center gap-x-2'
        >
          <label htmlFor={`question-${question.questionId}-answer-field`}>
            <p className='text-base font-semibold'>Trả lời: </p>
          </label>
          <input
            id={`question-${question.questionId}-answer-field`}
            type='text'
            disabled={status !== QuizStatus.ONGOING}
            placeholder='Nhập câu trả lời'
            value={stringAnswer}
          />
        </div>
      );
    default:
      return null;
  }
});

type Props = {
  question: ConcreteQuestion;
  status: QuizStatus;
  questionNumber: number;
};

const QuestionCard = ({ question, status, questionNumber }: Props) => {
  const [starred, setStarred] = useState(question.starred);
  const [stringAnswer, setStringAnswer] = useState<string>(
    String(question.userAnswerField || question.answerField)
  );
  const [numberAnswer, setNumberAnswer] = useState<number[]>(
    question.userAnswerKeys || question.answerKeys || []
  );

  return (
    <div
      className='flex w-full flex-1 flex-col items-start space-y-3 rounded-lg bg-white p-4
      md:bg-[#9DCCFF]/20 3xl:space-y-6'
    >
      <div className='flex w-full flex-row items-center justify-between gap-x-6'>
        <div className='flex flex-row items-center gap-x-2'>
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full p-1 ${
              status === QuizStatus.ENDED ? '' : 'hidden'
            } ${
              question.isCorrect === undefined
                ? 'border border-[#49CCCF] bg-transparent'
                : question.isCorrect
                ? 'bg-[#49CCCF]'
                : 'bg-[#DB4437]'
            }`}
          >
            <Icon.XMark
              className={`h-full w-full ${
                question.isCorrect === undefined ? 'hidden' : question.isCorrect ? 'hidden' : ''
              }`}
            />
          </div>
          <p className='text-base font-semibold md:text-lg 3xl:text-xl'>Câu {questionNumber}</p>
        </div>

        <div className='relative flex flex-row items-center'>
          <button
            type='button'
            onClick={() => {
              setStarred(true);
            }}
            disabled={status === QuizStatus.ENDED || starred}
            className={`absolute transition-all duration-300 ${starred ? '-z-10 opacity-0' : ''}`}
          >
            <Icon.StarDim className='h-6 w-auto' />
          </button>
          <button
            type='button'
            onClick={() => {
              setStarred(false);
            }}
            disabled={status === QuizStatus.ENDED || !starred}
            className={`relative transition-all duration-300 ${starred ? '' : '-z-10 opacity-0'}`}
          >
            <Icon.StarLit className='h-6 w-auto' />
          </button>
        </div>
      </div>

      <span className='hidden w-full border border-t-[#666] md:flex' />

      <div
        className='flex w-full flex-col items-start space-y-2 rounded-lg bg-[#9DCCFF]/20 p-2
        md:bg-transparent md:p-0 lg:space-y-3
        3xl:space-y-6'
      >
        <Markdown>{question.description}</Markdown>
        <InputAnswer
          status={status}
          question={question}
          helpers={{
            stringAnswer,
            numberAnswer,
            setStringAnswer,
            setNumberAnswer,
          }}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
