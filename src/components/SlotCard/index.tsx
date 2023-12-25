import { UseMutateAsyncFunction, useMutation, useQuery } from '@tanstack/react-query';
import { find, isNil } from 'lodash';
import {
  FC,
  useState,
  useMemo,
  useEffect,
  memo,
  ComponentPropsWithoutRef,
  MouseEvent,
  useCallback,
} from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import ExamSessionService from '../../service/examSession.service';
import useBoundStore from '../../store';
import { ExamSession, SessionStatus, Student } from '../../types';
import { parseDuration, parseCountdown, calculateProgress } from '../../utils/helper';
import Icon from '../Icon';
import InfoModal from '../Modal/InfoModal';
import StartSessionModal from '../Modal/StartSessionModal';
import UnregisterModal from '../Modal/UnregisterModal';

enum SlotStatus {
  OPEN = 'Mở đăng ký',
  REGISTERED = 'Đã đăng ký',
  ONGOING = 'Đang diễn ra',
  ENDED = 'Đã kết thúc',
  PREPARING = 'Chưa bắt đầu',
}

interface SlotButtonProps extends ComponentPropsWithoutRef<'button'> {
  slotStatus: SlotStatus;
  isRegistered: boolean;
  currentSession?: ExamSession | null;
}

const SlotButton = memo<SlotButtonProps>(function Button({
  slotStatus,
  isRegistered,
  disabled,
  currentSession,
  ...props
}) {
  switch (slotStatus) {
    case SlotStatus.OPEN:
      return (
        <button
          {...props}
          className='relative flex w-fit justify-center rounded-lg 
          bg-[#0F9D58]/80 py-2 px-3 duration-200 ease-linear hover:bg-[#0F9D58] disabled:bg-[#B3B3B3]'
          disabled={disabled}
        >
          <p className='opacity-0'>Tiếp tục làm bài</p>
          <p className='absolute flex-1 text-white'>Đăng ký</p>
        </button>
      );
    case SlotStatus.REGISTERED:
      return (
        <button
          {...props}
          disabled={disabled && !isRegistered}
          className='relative flex w-fit justify-center rounded-lg 
            bg-[#DB4437]/80 py-2 px-3 duration-200 ease-linear hover:bg-[#DB4437] disabled:bg-[#B3B3B3]'
        >
          <p className='opacity-0'>Tiếp tục làm bài</p>
          <p className='absolute flex-1 text-white'>Huỷ đăng ký</p>
        </button>
      );

    case SlotStatus.PREPARING:
      return (
        <button
          {...props}
          disabled={true}
          className='relative flex w-fit justify-center rounded-lg 
          py-2 px-3 duration-200 ease-linear disabled:bg-[#B3B3B3]'
        >
          <p className='opacity-0'>Tiếp tục làm bài</p>
          <p className='absolute flex-1 text-white'>Chưa bắt đầu</p>
        </button>
      );
    case SlotStatus.ONGOING:
      return (
        <button
          {...props}
          disabled={!isRegistered}
          className='relative flex w-fit justify-center rounded-lg 
          bg-[#4285F4]/80 py-2 px-3 duration-200 ease-linear hover:bg-[#4285F4] disabled:bg-[#B3B3B3]'
        >
          <p className='opacity-0'>Tiếp tục làm bài</p>
          <p className='absolute flex-1 text-white'>
            {isRegistered && currentSession ? 'Tiếp tục làm bài' : 'Làm bài'}
          </p>
        </button>
      );

    case SlotStatus.ENDED:
      return (
        <button
          {...props}
          disabled={!isRegistered}
          className='relative flex w-fit justify-center rounded-lg 
          bg-[#4285F4]/80 py-2 px-3 duration-200 ease-linear hover:bg-[#4285F4] disabled:bg-[#B3B3B3]'
        >
          <p className='opacity-0'>Tiếp tục làm bài</p>
          <p className='absolute flex-1 text-white'>Xem lại</p>
        </button>
      );
  }
});

type SlotCardProps = {
  examId: string;
  slotId: number;

  name: string;
  registeredUsers: Student[];
  userLimit: number;
  questionCount: number;
  registrationStartedAt: number;
  registrationEndedAt: number;

  startedAt: number;
  endedAt: number;
  disabled?: boolean;
  register: UseMutateAsyncFunction<void, unknown, number, unknown>;
  unregister: UseMutateAsyncFunction<void, unknown, void, unknown>;
};

const SlotCard: FC<SlotCardProps> = ({
  examId,
  slotId,
  name,
  startedAt,
  endedAt,
  registeredUsers,
  registrationStartedAt,
  registrationEndedAt,
  questionCount,
  userLimit,
  disabled,
  register,
  unregister,
}) => {
  const navigate = useNavigate();

  const [slotStatus, setSlotStatus] = useState<SlotStatus>(SlotStatus.OPEN);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [unregisterModalOpen, setUnregisterModalOpen] = useState(false);
  const [startSessionModalOpen, setStartSessionModalOpen] = useState(false);

  const user = useBoundStore.use.user();
  const isRegistered = useMemo(
    () => !!find(registeredUsers, (registeredUser) => registeredUser.userId === user._id),
    [registeredUsers, user._id]
  );

  const { data: examSession } = useQuery({
    queryKey: ['exam-session', examId],
    queryFn: async () => {
      const { data } = await ExamSessionService.getByExamId(examId);
      return data.payload;
    },
    enabled: !!examId,
  });

  const startDate = useMemo(
    () =>
      new Date(startedAt)
        .toLocaleString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',

          hourCycle: 'h23',
          hour12: false,
        })
        .replace(' ', ', '),
    [startedAt]
  );

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    const now = Date.now();

    if (now < registrationStartedAt) {
      setSlotStatus(SlotStatus.PREPARING);

      intervalId = setInterval(() => {
        setSlotStatus(SlotStatus.OPEN);
      }, registrationStartedAt - now);
    } else if (now < startedAt) {
      if (isRegistered) {
        setSlotStatus(SlotStatus.REGISTERED);
      } else {
        setSlotStatus(SlotStatus.OPEN);
      }

      if (now > registrationEndedAt) {
        setSlotStatus(SlotStatus.PREPARING);
      }

      intervalId = setInterval(() => {
        setSlotStatus(SlotStatus.ONGOING);
      }, startedAt - now);
    } else if (
      (!isNil(examSession) && examSession.status === SessionStatus.ENDED) ||
      now > endedAt
    ) {
      setSlotStatus(SlotStatus.ENDED);
    } else if (now >= startedAt) {
      setSlotStatus(SlotStatus.ONGOING);

      intervalId = setInterval(() => {
        setSlotStatus(SlotStatus.ENDED);
      }, endedAt - now);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startedAt, endedAt, isRegistered, registrationStartedAt, registrationEndedAt, examSession]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClick = useCallback(
    (() => {
      switch (slotStatus) {
        case SlotStatus.OPEN:
          return (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            setInfoModalOpen(true);
          };
        case SlotStatus.REGISTERED:
          return (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setUnregisterModalOpen(true);
          };
        case SlotStatus.ONGOING:
          return (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (isNil(examSession)) {
              setStartSessionModalOpen(true);
            } else {
              navigate(`/room/tests/session/${examSession._id}`);
            }
          };
        case SlotStatus.ENDED:
          return () => {
            navigate(`/room/tests/review/session/${examSession?._id}`);
          };
        default:
          return () => {};
      }
    })(),
    [slotStatus, examSession]
  );

  const { mutateAsync: startSession, isLoading: isStartingSession } = useMutation({
    mutationKey: ['startSession', examId, slotId],
    mutationFn: async () => {
      const { data } = await ExamSessionService.create(examId);
      return data.payload;
    },
    onSuccess: (data) => {
      toast.success('Bắt đầu làm bài thành công');
      navigate(`/room/tests/session/${data._id}`);
    },
  });

  const result = useMemo(() => calculateProgress(examSession?.questions || []), [examSession]);

  return (
    <>
      <div className='flex w-full flex-col rounded-lg p-4 leading-normal shadow-[0px_20px_20px_0px_rgba(47,50,125,0.1)]'>
        <div className='flex w-full flex-row items-center justify-between gap-x-2'>
          <div className='space-y-1'>
            <h3 className='text-[18px] font-semibold'>{name}</h3>
            <p className='whitespace-nowrap text-[14px] font-medium'>
              <span className='text-[#4285F4]'>Trạng thái:</span> {slotStatus}
            </p>
          </div>

          {slotStatus === 'Đang diễn ra' ? (
            <>
              <div className='flex flex-row gap-x-1 rounded-full border border-[#4285F4]/30 px-3 py-2 md:hidden'>
                <Icon.Clock className='h-5 w-auto' fill='#4285F4' />
                <Countdown
                  date={endedAt}
                  renderer={(props) => {
                    return <p className='text-[14px]'>{parseDuration(props.total)}</p>;
                  }}
                />
              </div>
              <div
                className='hidden flex-row rounded-lg border border-[#4285F4]/30 px-3 py-2 
                md:flex md:gap-x-5 
                lg:gap-x-6 lg:px-4 
                xl:gap-x-7 xl:px-5 
                2xl:gap-x-8 
                3xl:gap-x-9'
              >
                <p className='font-medium'>Thời gian còn lại:</p>
                <Countdown
                  date={endedAt}
                  renderer={(props) => {
                    return <p className='text-[#4285F4]'>{parseCountdown(props.total)}</p>;
                  }}
                />
              </div>
            </>
          ) : null}
        </div>

        <div
          className='-mx-4 mt-3 grid w-[calc(100%+32px)] grid-cols-1 gap-y-2 bg-[#9DCFFF]/30 p-4 
          lg:auto-cols-fr lg:grid-flow-col lg:grid-rows-3'
        >
          <div className='flex flex-row items-center gap-x-1'>
            <Icon.CalendarIcon className='h-6 w-6' fill='#252641' />
            <p>Bắt đầu vào: {startDate}</p>
          </div>

          <div className='flex flex-row items-center gap-x-1'>
            <Icon.Clock className='h-6 w-auto' fill='#252641' />
            <p>Thời gian làm bài: {parseDuration(endedAt - startedAt)}</p>
          </div>

          <div className='flex flex-row items-center gap-x-1'>
            <Icon.List className='h-6 w-6' fill='#252641' />
            <p>Số câu: {questionCount} câu</p>
          </div>

          {slotStatus !== SlotStatus.ENDED ? (
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.AboutUs className='h-6 w-6' fill='#252641' />
              <p>
                Lượt đăng ký: {registeredUsers.length}/{userLimit}
              </p>
            </div>
          ) : null}

          {slotStatus === SlotStatus.ONGOING && !isRegistered ? (
            <div className='block text-[12px] text-[#E57368] md:text-[14px] lg:hidden'>
              Bạn không thể làm bài vì chưa đăng ký ca thi này!
            </div>
          ) : null}

          {slotStatus === SlotStatus.ENDED && isRegistered ? (
            <div className='flex flex-row items-center gap-x-1'>
              <Icon.DoneAll fill='#252641' className='h-auto w-6' />
              <p>
                Số điểm: {examSession?.standardizedScore || 0} ({result.totalCorrect}/
                {questionCount} câu)
              </p>
            </div>
          ) : null}
        </div>

        <div className='mt-4 flex flex-row items-center justify-between'>
          <SlotButton
            slotStatus={slotStatus}
            isRegistered={isRegistered}
            onClick={onClick}
            disabled={disabled || isStartingSession}
            currentSession={examSession}
          />
          {slotStatus === SlotStatus.ONGOING && !isRegistered ? (
            <div className='hidden text-[14px] text-[#E57368] lg:block'>
              Bạn không thể làm bài vì chưa đăng ký ca thi này!
            </div>
          ) : null}
        </div>
      </div>
      <InfoModal
        isOpen={infoModalOpen}
        handleOpen={setInfoModalOpen}
        register={async () => {
          await register(slotId);
        }}
      />
      <UnregisterModal
        isOpen={unregisterModalOpen}
        handleOpen={setUnregisterModalOpen}
        unregister={unregister}
      />
      <StartSessionModal
        isOpen={startSessionModalOpen}
        handleOpen={setStartSessionModalOpen}
        start={startSession}
      />
    </>
  );
};

export default SlotCard;
