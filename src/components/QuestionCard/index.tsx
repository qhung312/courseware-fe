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
import { QuestionType, type ConcreteQuestion } from '../../types/question';
import { QuizStatus } from '../../types/quiz';
import Icon from '../Icon';

type InputAnswerProps = {
  question: ConcreteQuestion['subQuestions'][0];
  helpers: {
    stringAnswer: string;
    singleValueAnswer: number;
    multipleValueAnswer: number[];
    setQuestion: (question: ConcreteQuestion['subQuestions'][0]) => void;
    setStringAnswer: Dispatch<SetStateAction<string>>;
    setSingleValueAnswer: Dispatch<SetStateAction<number>>;
    setMultipleValueAnswer: Dispatch<SetStateAction<number[]>>;
  };
};

const InputAnswer = memo(function Component({ question, helpers }: InputAnswerProps) {
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
      setQuestion({
        ...question,
        userAnswerKeys:
          question.userAnswerKeys !== undefined
            ? _.includes(question.userAnswerKeys, Number(e.target.value))
              ? question.userAnswerKeys.length <= 1
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
                    setQuestion({
                      ...question,
                      userAnswerKey: option.key,
                    });
                  }}
                  type='radio'
                  name={`question-${question._id}`}
                  value={option.key}
                  checked={singleValueAnswer === option.key}
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
          {question.options?.map((option, index) => (
            <div
              key={`question-${question._id}-answer-${option.key}`}
              className='relative flex flex-row flex-nowrap items-center justify-center gap-x-2'
            >
              <div className='relative flex items-center'>
                <input
                  id={`question-${question._id}-answer-${option.key}`}
                  onChange={optimizedSetMultipleValueAnswer}
                  name={`question-${question._id}`}
                  type='checkbox'
                  multiple
                  value={option.key}
                  checked={multipleValueAnswer.includes(option.key)}
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
  question: ConcreteQuestion['subQuestions'][0];
  status: QuizStatus;
  questionNumber: number;
  handleChange: (question: ConcreteQuestion['subQuestions'][0]) => void;
};

const QuestionCard = ({ question, status, questionNumber, handleChange }: Props) => {
  const [starred, setStarred] = useState(question.starred);
  const [stringAnswer, setStringAnswer] = useState<string>(String(question.userAnswerField));
  const [singleValueAnswer, setSingleValueAnswer] = useState<number>(question.userAnswerKey || -1);
  const [multipleValueAnswer, setMultipleValueAnswer] = useState<number[]>(
    question.userAnswerKeys || []
  );

  useEffect(() => {
    if (stringAnswer !== '' || singleValueAnswer !== -1 || multipleValueAnswer.length !== 0) {
      setStarred(false);
      handleChange({
        ...question,
        starred: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stringAnswer, singleValueAnswer, multipleValueAnswer, handleChange]);

  return (
    <div className='flex w-full flex-1 flex-col items-start space-y-3 rounded-lg bg-white p-4'>
      <div className='flex w-full flex-row items-center justify-between gap-x-6'>
        <div className='flex flex-row items-center gap-x-2'>
          <div
            className={`h-5 w-5 rounded-full bg-[#49BBBD] ${
              status === QuizStatus.ENDED ? '' : 'hidden'
            }`}
          />
          <p className='text-base font-semibold'>Câu {questionNumber}</p>
        </div>

        <div className='relative flex flex-row items-center'>
          <button
            type='button'
            onClick={() => {
              setStarred(true);
              setStringAnswer('');
              setSingleValueAnswer(-1);
              setMultipleValueAnswer([]);
              handleChange({
                ...question,
                starred: true,
                userAnswerField: undefined,
                userAnswerKey: undefined,
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
              handleChange({ ...question, starred: false });
            }}
            disabled={status === QuizStatus.ENDED || !starred}
            className={`relative transition-all duration-300 ${starred ? '' : '-z-10 opacity-0'}`}
          >
            <Icon.StarLit className='h-6 w-auto' />
          </button>
        </div>
      </div>

      <div className='flex flex-col items-start space-y-2 rounded-lg bg-[#9DCCFF]/20 p-2'>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adi piscing elit, sed do eiusmodadipiscing elit,
          sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmodadipiscing elit, sed do eiusmodLorem ipsum dolor sit amet, consectetur adipiscing
          elit
        </p>
        <InputAnswer
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
