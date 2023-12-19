import { find } from 'lodash';
import { FC, useEffect, useMemo, useState } from 'react';
import Countdown from 'react-countdown';
import { Link, useParams } from 'react-router-dom';

import { ReactComponent as Tab } from '../../../assets/svgs/Tab.svg';
import { Icon } from '../../../components';
import { examData as exams } from '../../../data/MockTestSessionData';
import { Page, Wrapper } from '../../../layout';
import useBoundStore from '../../../store';
import { Question, User } from '../../../types';
import { parseCountdown, parseDuration } from '../../../utils/helper';
import RoomAside from '../RoomAside';

type SlotCardProps = {
  name: string;
  registeredUsers: User[];
  userLimit: number;
  questions: Question[];

  startedAt: number;
  endedAt: number;
};

enum SlotStatus {
  OPEN = 'Mở đăng ký',
  REGISTERED = 'Đã đăng ký',
  ONGOING = 'Đang diễn ra',
  ENDED = 'Đã kết thúc',
}

const SlotCard: FC<SlotCardProps> = ({
  name,
  startedAt,
  endedAt,
  registeredUsers,
  //TODO questions,
  userLimit,
}) => {
  const [slotStatus, setSlotStatus] = useState<SlotStatus>(SlotStatus.OPEN);

  const user = useBoundStore.use.user();

  const isRegistered = useMemo(
    () => find(registeredUsers, (registeredUser) => registeredUser.email === user.email),
    [registeredUsers, user.email]
  );
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

    if (now < startedAt) {
      if (isRegistered) {
        setSlotStatus(SlotStatus.REGISTERED);
      } else {
        setSlotStatus(SlotStatus.OPEN);
      }

      intervalId = setInterval(() => {
        setSlotStatus(SlotStatus.ONGOING);
      }, startedAt - now);
    } else if (now > endedAt) {
      setSlotStatus(SlotStatus.ENDED);
    } else {
      setSlotStatus(SlotStatus.ONGOING);

      intervalId = setInterval(() => {
        setSlotStatus(SlotStatus.ENDED);
      }, endedAt - now);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startedAt, endedAt, isRegistered]);

  const button = useMemo(() => {
    if (slotStatus === SlotStatus.OPEN) {
      return {
        text: 'Đăng ký',
        color: 'bg-[#0F9D58]/80 hover:bg-[#0F9D58]',
      };
    }
    if (slotStatus === SlotStatus.REGISTERED) {
      return {
        text: 'Huỷ đăng ký',
        color: 'bg-[#DB4437]/80 hover:bg-[#DB4437]',
      };
    }
    if (slotStatus === SlotStatus.ONGOING) {
      if (isRegistered) {
        return {
          text: 'Làm bài',
          color: 'bg-[#4285F4]/80 hover:bg-[#4285F4]',
        };
      }
      return {
        text: 'Làm bài',
        disabled: true,
        color: 'bg-[#B3B3B3]',
      };
    }
    if (isRegistered) {
      return {
        text: 'Xem lại',
        color: 'bg-[#4285F4]/80 hover:bg-[#4285F4]',
      };
    }
    return {
      text: 'Xem lại',
      disabled: true,
      color: 'bg-[#B3B3B3]',
    };
  }, [slotStatus, isRegistered]);

  return (
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
          <p>
            Số câu:
            {/* {questions.length}  */} 15 câu
          </p>
        </div>

        {slotStatus !== SlotStatus.ENDED ? (
          <div className='flex flex-row items-center gap-x-1'>
            <Icon.AboutUs className='h-6 w-6' fill='#252641' />
            <p>
              Lượt đăng ký:
              {/* {registeredUsers.length} */} 22/{userLimit}
            </p>
          </div>
        ) : null}

        {slotStatus === SlotStatus.ONGOING && !isRegistered ? (
          <div className='block text-[12px] text-[#E57368] md:text-[14px] lg:hidden'>
            !Bạn không thể làm bài vì chưa đăng ký ca thi này
          </div>
        ) : null}

        {slotStatus === SlotStatus.ENDED && isRegistered ? (
          <div className='flex flex-row items-center gap-x-1'>
            <Icon.DoneAll fill='#252641' className='h-auto w-6' />
            <p>
              Số điểm:
              {/* {registeredUsers.length} */} 08.50 (85/100 câu)
            </p>
          </div>
        ) : null}
      </div>

      <div className='mt-4 flex flex-row items-center justify-between'>
        <button
          disabled={!!button.disabled}
          className={`relative flex w-fit justify-center rounded-lg ${button.color} py-2 px-3`}
        >
          <p className='opacity-0'>Huỷ đăng ký</p>
          <p className='absolute flex-1 text-white'>{button.text}</p>
        </button>
        {slotStatus === SlotStatus.ONGOING && !isRegistered ? (
          <div className='hidden text-[14px] text-[#E57368] lg:block'>
            !Bạn không thể làm bài vì chưa đăng ký ca thi này
          </div>
        ) : null}
      </div>
    </div>
  );
};

const DetailTest: FC = () => {
  const params = useParams();

  const subjects = useBoundStore.use.subjects();

  const typeOfTest = params['*']?.includes('midterm') ? 'midterm' : 'final';
  const testName = typeOfTest === 'midterm' ? 'Giữa Kì' : 'Cuối Kì';
  const currentSubject = subjects.find((subject) => subject._id === params.subjectId);

  if (!currentSubject) {
    return (
      <Page title={`Thi thử - ${testName}`}>
        <RoomAside
          title={`Thi thử ${testName}`}
          subTitle='Phòng thi'
          baseRoute={`/room/tests/${typeOfTest}/${params.semester}`}
        />
        <Wrapper className='flex flex-1 flex-col'>
          <main className='flex flex-col px-5 py-4 md:px-8 md:py-6 lg:px-10 lg:py-8 xl:px-12 2xl:px-14 2xl:py-10'>
            <div className='flex w-full justify-start'>
              <h1 className='text-[24px] font-bold leading-normal text-[#4285F4] md:text-[#2F327D] 2xl:text-[28px] 3xl:text-[32px]'>
                Thi thử {testName}
              </h1>
            </div>
            <div className='mb-6 flex-1 space-y-4 px-6 pt-4 lg:space-y-6 lg:px-7 lg:pt-5 3xl:space-y-8 3xl:px-8 3xl:pt-6'>
              <div className='z-10 rounded-lg bg-white px-4 py-3 lg:p-5 3xl:p-7'>
                <Tab className='mx-auto w-[200px] p-7 xl:w-[300px]' />
                <p className='w-full text-center'>Chọn một môn học</p>
              </div>
            </div>
          </main>
        </Wrapper>
      </Page>
    );
  }

  return (
    <Page title={`Thi thử - ${testName} - ${currentSubject.name}`}>
      <RoomAside
        title={`Thi thử ${testName} - ${currentSubject.name}`}
        subTitle='Phòng thi'
        baseRoute={`/room/tests/${typeOfTest}/${params.semester}`}
      />
      <Wrapper className='h-fit min-h-full w-full leading-normal'>
        <main
          className='flex h-fit min-h-full w-full flex-col px-5 py-4
          md:px-8 md:py-6 
          lg:px-10 lg:py-7 
          xl:px-12 xl:py-8
          2xl:px-[52px] 2xl:py-9
          3xl:py-10 3xl:px-[60px]'
        >
          <div className='flex w-full items-start md:hidden'>
            <Link
              to={`/room/tests/${typeOfTest}`}
              className='flex items-center space-x-2 rounded-lg bg-[#4285F4] px-2 py-1 text-white 
              hover:bg-[#4285F4] hover:underline 
              lg:bg-[#4285F4]/70'
            >
              <Icon.ChevronLeft className='aspect-square w-2 fill-white md:w-3' />
              <p className='whitespace-nowrap text-[16px] font-semibold text-inherit 2xl:text-[20px]'>
                Quay lại
              </p>
            </Link>
          </div>
          <div className='mt-6 flex flex-col gap-y-1'>
            <h1
              className='text-[24px] font-bold text-[#4285F4] 
            md:text-[#2F327D] 
              2xl:text-[28px] 
              3xl:text-[32px]'
            >
              Thi thử {testName}{' '}
              <span className='hidden md:inline-block'> - {currentSubject.name}</span>
            </h1>
            <h2 className='text-[20px] md:hidden'>Môn học: {currentSubject.name}</h2>
          </div>

          <div
            className='mt-5 flex w-full flex-row items-center gap-x-2 rounded-lg border border-[#4285F4] px-4 py-3
            md:w-fit
            xl:gap-x-3
            3xl:gap-x-4'
          >
            <Icon.CalendarIcon className='h-6 w-6 fill-[#252641]' />
            <p className='text-[16px] lg:text-[18px] 3xl:text-[20px]'>
              Mở từ xx/xx/xxxx đến xx/xx/xxxx
            </p>
          </div>

          <div className='mt-10 grid grid-cols-1 gap-y-6 gap-x-10 2xl:grid-cols-2'>
            {exams[0].slots.map((slot) => (
              <SlotCard key={slot.slotId} {...slot} />
            ))}
          </div>
        </main>
      </Wrapper>
    </Page>
  );
};

export default DetailTest;
