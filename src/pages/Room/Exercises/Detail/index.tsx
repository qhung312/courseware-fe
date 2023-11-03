import { useCallback, useState } from 'react';

import Quiz from '../../../../data/exercises';
import { useWindowDimensions } from '../../../../hooks';
import { Page } from '../../../../layout';
import { ConcreteQuestion } from '../../../../types';

import DesktopOngoing from './DesktopOngoing';
import MobileOngoing from './MobileOngoing';

const OngoingDetail: React.FC = () => {
  const [quiz, setQuiz] = useState(Quiz);
  const { width } = useWindowDimensions();

  const handleAnswer = useCallback((question: ConcreteQuestion) => {
    setQuiz((prev) => {
      const newQuestions = prev.questions.map((q) => {
        if (q._id === question._id) {
          return question;
        }
        return q;
      });
      return { ...prev, questions: newQuestions };
    });
  }, []);

  return (
    <Page title={`${quiz.fromQuiz.subject.name} - ${quiz.fromQuiz.chapter.name}`}>
      {width < 768 ? (
        <MobileOngoing quiz={quiz} handleAnswer={handleAnswer} />
      ) : (
        <DesktopOngoing quiz={quiz} handleAnswer={handleAnswer} />
      )}
    </Page>
  );
};

export default OngoingDetail;
