import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './QuestionSlide.css';
import Icon from '../Icon';

interface QuestionSlideProps {
  questions: {
    questionId: string;
    questionNumber: number;
    prompt: string;
    images?: string[];
    answers: string[];
  }[];
}

const NextQuestionArrow = (clickHandler: () => void, _hasNext: boolean, _label: string) => (
  <div className='absolute top-0 right-0 z-[1] h-[50%]'>
    <button
      className='sticky top-[50%] left-0 z-[1] flex 
      w-[14px] items-center justify-center 
      transition-all duration-700 ease-in
      md:w-[20px] xl:w-[32px]'
      onClick={clickHandler}
    >
      <Icon.ChevronRight className='mt-[-50%] aspect-[36.6/65] h-auto w-[50%]' fill={'#252641'} />
    </button>
  </div>
);

const PreviousQuestionArrow = (clickHandler: () => void, _hasPrev: boolean, _label: string) => (
  <div className='absolute top-0 left-0 z-[1] h-full'>
    <button
      className='sticky top-[50%] left-0 z-[1] flex 
      w-[14px] items-center justify-center 
      transition-all duration-700 ease-in
      md:w-[20px] xl:w-[32px]'
      onClick={clickHandler}
    >
      <Icon.ChevronLeft className='mt-[-50%] aspect-[36.6/65] h-auto w-[50%]' fill={'#252641'} />
    </button>
  </div>
);

const Question = ({ question }: { question: QuestionSlideProps['questions'][0] }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  return (
    <div className='w-full px-5 py-4 md:px-8 xl:px-12'>
      <div className='relative flex w-full flex-row items-center justify-center'>
        <h1 className='text-center text-2xl font-bold'>Câu {question.questionNumber}</h1>
        <button
          type='button'
          className='absolute right-0 hover:text-[#4285F4] hover:underline'
          onClick={() => setSelectedAnswer(null)}
        >
          <p className='h-full w-full'>Đánh dấu chưa làm</p>
        </button>
      </div>
      <p className='my-3 text-justify text-xs md:text-base'>{question.prompt}</p>
      <div className='flex flex-col flex-wrap items-start justify-center gap-y-4'>
        {question.answers.map((answer) => (
          <div
            key={`question-${question.questionNumber}-answer-${answer}`}
            className='relative flex flex-row flex-nowrap items-center justify-center gap-x-4'
          >
            <div className='relative flex items-center'>
              <input
                onClick={() => setSelectedAnswer(answer)}
                type='radio'
                name='answer'
                value={answer}
                checked={selectedAnswer === answer}
              />
              <span className='absolute left-[50%]'>
                <span className='ml-[-100%]'>{answer}</span>
              </span>
            </div>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuestionSlide = ({ questions }: QuestionSlideProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const nav = document.getElementById('question-nav');
    console.log(nav?.getBoundingClientRect().left, nav?.getBoundingClientRect().width);
    const button = document.getElementById(`question-${currentSlide + 1}`);
    console.log(button, button?.getBoundingClientRect().left);
    if (
      button &&
      nav &&
      (button.getBoundingClientRect().left - nav.getBoundingClientRect().left < 0 ||
        button.getBoundingClientRect().left - nav.getBoundingClientRect().left >
          nav.getBoundingClientRect().width - 80)
    ) {
      button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentSlide]);

  return (
    <div className='my-8 flex w-full flex-1 flex-col gap-y-4'>
      <div
        id='question-nav'
        className='flex flex-1 flex-row items-center justify-between gap-x-4 overflow-x-auto'
      >
        {questions.map((question) => (
          <button
            type='button'
            id={`question-${question.questionNumber}`}
            onClick={() => {
              setCurrentSlide(question.questionNumber - 1);
            }}
            key={`question-${question.questionId}`}
            className={`m-auto flex w-[80px] flex-shrink-0 items-center justify-center p-2 
              transition-all duration-300 ${
                question.questionNumber - 1 === currentSlide
                  ? 'rounded-xl bg-[rgba(66,133,244,0.9)] font-semibold text-white'
                  : ''
              }`}
          >
            <p className='text-center'>Câu {`${question.questionNumber}`}</p>
          </button>
        ))}
      </div>
      <Carousel
        selectedItem={currentSlide}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        showArrows
        autoPlay={false}
        dynamicHeight
        swipeable={false}
        infiniteLoop
        transitionTime={800}
        renderArrowPrev={(_clickHandler, hasPrev, _label) =>
          PreviousQuestionArrow(
            () => setCurrentSlide((currentSlide + questions.length - 1) % questions.length),
            hasPrev,
            _label
          )
        }
        renderArrowNext={(_clickHandler, hasNext, label) =>
          NextQuestionArrow(
            () => setCurrentSlide((currentSlide + 1) % questions.length),
            hasNext,
            label
          )
        }
        renderThumbs={() =>
          questions.map((question) => (
            <div key={`question-${question.questionId}`} className='m-auto w-full p-2'>
              <p className='text-center'>Câu {question.questionNumber}</p>
            </div>
          ))
        }
        className='flex max-w-full flex-1 flex-col rounded-2xl bg-white'
      >
        {questions.map((question) => (
          <Question key={`question-${question.questionId}`} question={question} />
        ))}
      </Carousel>
    </div>
  );
};

export default QuestionSlide;
