import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isNil, some } from 'lodash';
import { FC, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ReactComponent as Tab } from '../../../../assets/svgs/Tab.svg';
import { Histogram, Icon, Loading, SlotCard } from '../../../../components';
import { Page, Wrapper } from '../../../../layout';
import ExamService from '../../../../service/exam.service';
import useBoundStore from '../../../../store';
import RoomAside from '../../RoomAside';

const DetailTest: FC = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const user = useBoundStore.use.user();
  const subjects = useBoundStore.use.subjects();
  const typeOfTest = params['*']?.includes('midterm') ? 'midterm' : 'final';
  const testName = typeOfTest === 'midterm' ? 'Giữa Kì' : 'Cuối Kì';

  const { data: exams, isLoading } = useQuery({
    placeholderData: [],
    queryKey: ['exams', typeOfTest, params.semester, params.subjectId],
    enabled: !!params.subjectId,
    queryFn: async () => {
      const { data } = await ExamService.getAll({
        type: typeOfTest,
        semester: params.semester,
        subject: params.subjectId,
      });

      return data.payload.result;
    },
  });

  const { data: summary, isFetching: isFetchingSummary } = useQuery({
    queryKey: ['summary', exams?.[0]?._id],
    enabled: !!exams?.[0],
    queryFn: async () => {
      const { data } = await ExamService.getSummary(exams?.[0]?._id || '');

      return data.payload;
    },
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: register, isLoading: isRegistering } = useMutation({
    mutationKey: ['register', exams?.[0]?._id],
    mutationFn: async (slotId: number) => {
      await ExamService.register(exams?.[0]._id || '', slotId);
    },
    onSuccess: () => {
      toast.success('Đăng ký thành công');
      queryClient.invalidateQueries(['exams', typeOfTest, params.semester, params.subjectId]);
    },
    onError: () => {
      toast.error('Đã có lỗi trong lúc đăng ký! Vui lòng thử lại sau.');
    },
  });

  const { mutateAsync: unregister, isLoading: isUnregistering } = useMutation({
    mutationKey: ['unregister', exams?.[0]?._id],
    mutationFn: async () => {
      await ExamService.unregister(exams?.[0]._id || '');
    },
    onSuccess: () => {
      toast.success('Huỷ đăng ký thành công');
      queryClient.invalidateQueries(['exams', typeOfTest, params.semester, params.subjectId]);
    },
    onError: () => {
      toast.error('Đã có lỗi trong lúc huỷ đăng ký! Vui lòng thử lại sau.');
    },
  });

  const currentSubject = useMemo(
    () => subjects.find((subject) => subject._id === params.subjectId),
    [params.subjectId, subjects]
  );

  const registrationStartedAt = exams && exams[0] ? exams[0].registrationStartedAt : 0;
  const registrationEndedAt = exams && exams[0] ? exams[0].registrationEndedAt : 0;
  const registrationStartedDate = useMemo(
    () =>
      registrationStartedAt
        ? new Date(registrationStartedAt)
            .toLocaleString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',

              hourCycle: 'h23',
              hour12: false,
            })
            .replace(' ', ', ')
        : null,
    [registrationStartedAt]
  );
  const registrationEndedDate = useMemo(
    () =>
      registrationEndedAt
        ? new Date(registrationEndedAt)
            .toLocaleString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',

              hourCycle: 'h23',
              hour12: false,
            })
            .replace(' ', ', ')
        : null,
    [registrationEndedAt]
  );

  const disabledRegister =
    exams && exams[0]
      ? some(exams[0].slots, (slot) =>
          slot.registeredUsers.find((registeredUser) => registeredUser.userId === user._id)
        )
      : undefined;

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

  if (isLoading || isFetchingSummary) {
    return <Loading />;
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
              to={`/room/tests/${typeOfTest}/${params.semester}`}
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
              {isNil(registrationStartedDate) || isNil(registrationEndedDate)
                ? 'Chưa mở đăng ký'
                : `Mở đăng ký từ ${registrationStartedDate} đến ${registrationEndedDate}`}
            </p>
          </div>
          {summary && summary.length ? <Histogram scores={summary} title={`Phổ điểm`} /> : null}

          <div className='mt-10 grid grid-cols-1 gap-y-6 gap-x-10 2xl:grid-cols-2'>
            {exams && exams[0]
              ? exams[0].slots.map((slot) => (
                  <SlotCard
                    key={slot.slotId}
                    {...slot}
                    registrationStartedAt={exams[0].registrationStartedAt}
                    registrationEndedAt={exams[0].registrationEndedAt}
                    examId={exams[0]._id}
                    questionCount={slot.questionCount || 0}
                    register={register}
                    unregister={unregister}
                    disabledRegisterButton={disabledRegister || isRegistering || isUnregistering}
                  />
                ))
              : null}
          </div>
        </main>
      </Wrapper>
    </Page>
  );
};

export default DetailTest;
