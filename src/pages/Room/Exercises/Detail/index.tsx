import { useCallback, useState } from 'react';

import Quiz from '../../../../data/exercises';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import { ConcreteQuestion } from '../../../../types';

import DesktopOngoing from './DesktopOngoing';
import DesktopReview from './DesktopReview';
import MobileOngoing from './MobileOngoing';
import MobileReview from './MobileReview';

const OngoingDetail: React.FC = () => {
  const [quiz, setQuiz] = useState(Quiz);
  const { width } = useWindowDimensions();

  const handleAnswer = useCallback((question: ConcreteQuestion['subQuestions'][0]) => {
    setQuiz((prev) => {
      const newQuestions = prev.questions.map((q) => {
        return {
          ...q,
          subQuestions: q.subQuestions.map((subQ) => {
            if (subQ._id === question._id) {
              return question;
            }
            return subQ;
          }),
        };
      });
      return { ...prev, questions: newQuestions };
    });
  }, []);

  return (
    <Page title={`${quiz.fromTemplate.subject.name} - ${quiz.fromTemplate.chapter.name}`}>
      {width < 768 ? (
        quiz.status === 'ONGOING' ? (
          <MobileOngoing quiz={quiz} handleAnswer={handleAnswer} />
        ) : (
          <MobileReview quiz={quiz} />
        )
      ) : quiz.status === 'ONGOING' ? (
        <DesktopOngoing quiz={quiz} handleAnswer={handleAnswer} />
      ) : (
        <DesktopReview quiz={quiz} />
      )}
    </Page>
  );
};

export default OngoingDetail;
