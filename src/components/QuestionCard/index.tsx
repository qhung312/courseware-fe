import _ from 'lodash';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import './index.css';
import { Markdown } from '..';
import { QuestionType, type ConcreteQuestion } from '../../types/question';
import { QuizStatus } from '../../types/quiz';
import Icon from '../Icon';

type InputAnswerProps = {
  status: QuizStatus;
  question: ConcreteQuestion;
  helpers: {
    stringAnswer: string;
    singleValueAnswer: number;
    multipleValueAnswer: number[];
    setQuestion?: (question: ConcreteQuestion) => void;
    setStringAnswer: Dispatch<SetStateAction<string>>;
    setSingleValueAnswer: Dispatch<SetStateAction<number>>;
    setMultipleValueAnswer: Dispatch<SetStateAction<number[]>>;
  };
};

const InputAnswer = memo(function Component({ status, question, helpers }: InputAnswerProps) {
  const {
    stringAnswer,
    singleValueAnswer,
    multipleValueAnswer,
    setQuestion,
    setSingleValueAnswer,
    setMultipleValueAnswer,
  } = helpers;
  const optionLabels = ['A', 'B', 'C', 'D'];

  const optimizedSetMultipleValueAnswer = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuestion &&
        setQuestion({
          ...question,
          userAnswerKeys:
            question.userAnswerKeys !== undefined
              ? _.includes(question.userAnswerKeys, Number(e.target.value))
                ? question.userAnswerKeys.length > 1
                  ? _.without(question.userAnswerKeys, Number(e.target.value))
                  : undefined
                : _.concat(question.userAnswerKeys, Number(e.target.value))
              : [Number(e.target.value)],
        });
      setMultipleValueAnswer((prevState) =>
        _.includes(prevState, Number(e.target.value))
          ? _.without(prevState, Number(e.target.value))
          : _.concat(prevState, Number(e.target.value))
      );
    },
    [setMultipleValueAnswer, setQuestion, question]
  );

  switch (question.type) {
    case QuestionType.MULTIPLE_CHOICE_SINGLE_ANSWER:
      return (
        <div className='flex flex-col flex-wrap items-start justify-center gap-y-4'>
          {question.options?.map((option, index) => (
            <div
              key={`question-${index + 1}-answer-${option.key}`}
              className='relative flex flex-row flex-nowrap items-center justify-center gap-x-2'
            >
              <div className='relative flex items-center'>
                <input
                  id={`question-${question._id}-answer-${option.key}`}
                  onChange={() => {
                    setSingleValueAnswer(option.key);
                    setQuestion &&
                      setQuestion({
                        ...question,
                        userAnswerField: option.key,
                      });
                  }}
                  disabled={status !== QuizStatus.ONGOING}
                  className={`${
                    status === QuizStatus.ONGOING
                      ? 'checked:bg-[#4285F4]'
                      : question.isCorrect === undefined || question.userAnswerField === undefined
                      ? 'checked:bg-transparent'
                      : (question.isCorrect && Number(question.userAnswerField) === option.key) ||
                        Number(question.answerField) === option.key
                      ? 'checked:bg-[#49CCCF]'
                      : 'checked:bg-[#DB4437]'
                  }`}
                  style={{ borderRadius: '9999px' }}
                  type='checkbox'
                  name={`question-${question._id}`}
                  value={option.key}
                  multiple={status === QuizStatus.ENDED}
                  checked={
                    singleValueAnswer === option.key ||
                    (status === QuizStatus.ENDED && Number(question.answerField) === option.key)
                  }
                />
                <span className='absolute left-1/2 flex items-center justify-center'>
                  <span className='-ml-[100%] h-full text-xs md:text-base'>
                    {optionLabels[index]}
                  </span>
                </span>
              </div>
              <label htmlFor={`question-${question._id}-answer-${option.key}`}>
                <p className='text-xs md:text-base'>{option.description}</p>
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
              key={`question-${question._id}-answer-${option.key}`}
              className='relative flex flex-row flex-nowrap items-center justify-center gap-x-2'
            >
              <div className='relative flex items-center'>
                <input
                  id={`question-${question._id}-answer-${option.key}`}
                  className={`${
                    status === QuizStatus.ONGOING
                      ? 'checked:bg-[#4285F4]'
                      : question.isCorrect === undefined || question.userAnswerKeys === undefined
                      ? ''
                      : (question.isCorrect && question.userAnswerKeys.includes(option.key)) ||
                        question.answerKeys?.includes(option.key)
                      ? 'checked:bg-[#49CCCF]'
                      : 'checked:bg-[#DB4437]'
                  }`}
                  disabled={status !== QuizStatus.ONGOING}
                  onChange={optimizedSetMultipleValueAnswer}
                  name={`question-${question._id}`}
                  type='checkbox'
                  multiple
                  value={option.key}
                  checked={
                    multipleValueAnswer.includes(option.key) ||
                    (status === QuizStatus.ENDED && question.answerKeys?.includes(option.key))
                  }
                />
                <span className='absolute left-1/2 flex items-center justify-center'>
                  <span className='-ml-[100%] h-full text-xs md:text-base'>
                    {question.isCorrect === undefined ? null : (question.isCorrect &&
                        question.userAnswerKeys?.includes(option.key)) ||
                      question.answerKeys?.includes(option.key) ? (
                      <Icon.Checkmark className='h-4 w-auto md:h-6' />
                    ) : (
                      <Icon.XMark className='h-4 w-auto md:h-6' />
                    )}
                  </span>
                </span>
              </div>
              <label htmlFor={`question-${question._id}-answer-${option.key}`}>
                <p className='text-xs md:text-base'>{option.description}</p>
              </label>
            </div>
          ))}
        </div>
      );
    case QuestionType.TEXT:
      return (
        <div
          key={`question-${question._id}`}
          className='relative flex flex-row flex-nowrap items-center justify-center gap-x-2'
        >
          <label htmlFor={`question-${question._id}`}>
            <p className='text-base font-semibold'>Trả lời: </p>
          </label>
          <input
            id={`question-${question._id}`}
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
  handleChange?: (question: ConcreteQuestion) => void;
};

const QuestionCard = ({ question, status, questionNumber, handleChange }: Props) => {
  const [starred, setStarred] = useState(question.starred);
  const [stringAnswer, setStringAnswer] = useState<string>(
    String(question.userAnswerField || question.answerField)
  );
  const [singleValueAnswer, setSingleValueAnswer] = useState<number>(
    Number(question.userAnswerField) || Number(question.userAnswerField) || -1
  );
  const [multipleValueAnswer, setMultipleValueAnswer] = useState<number[]>(
    question.userAnswerKeys || question.answerKeys || []
  );

  useEffect(() => {
    if (stringAnswer !== '' || singleValueAnswer !== -1 || multipleValueAnswer.length !== 0) {
      setStarred(false);
      handleChange &&
        handleChange({
          ...question,
          starred: false,
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringAnswer, singleValueAnswer, multipleValueAnswer, handleChange]);

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
              setStringAnswer('');
              setSingleValueAnswer(-1);
              setMultipleValueAnswer([]);
              handleChange &&
                handleChange({
                  ...question,
                  starred: true,
                  userAnswerField: undefined,
                  userAnswerKeys: undefined,
                });
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
              handleChange && handleChange({ ...question, starred: false });
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
            singleValueAnswer,
            multipleValueAnswer,
            setQuestion: handleChange,
            setSingleValueAnswer,
            setStringAnswer,
            setMultipleValueAnswer,
          }}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
