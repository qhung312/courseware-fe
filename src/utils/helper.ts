import type { GetPaginationOptions } from '../types/request';

export const MULTIPLE_CHOICE_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function test() {
  return null;
}

export function formatTime(time: number) {
  const date = new Date(time);

  return `${date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  })}, ${date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
}

export function getOffset(ref: React.RefObject<HTMLElement>) {
  const rect =
      ref.current === null || ref.current === undefined
        ? { top: 0 }
        : ref.current?.getBoundingClientRect(),
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
}

export function getOS() {
  const { userAgent } = window.navigator;
  const { platform } = window.navigator;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'MacOS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent)) {
    os = 'Android';
  } else if (!os && /Linux/.test(platform)) {
    os = 'Linux';
  }

  // @ts-ignore
  document.documentElement.setAttribute('os', os);
  return os;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

interface GenerateQueryProps extends GetPaginationOptions {
  name?: string;
  subjectId?: string;
  chapterId?: string;
  quizId?: string;
  questionId?: string;
}

export function generateQuery({ page, pageSize, ...rest }: GenerateQueryProps) {
  let filterUrl = '';
  (Object.keys(rest) as Array<keyof typeof rest>).forEach((key) => {
    if (isString(key)) {
      const value = rest[key];

      if (key === 'name' && value) {
        filterUrl += `name=${encodeURIComponent(value)}`;
      } else if (key.includes('Id') && value) {
        filterUrl += `&${key.slice(0, -2)}=${value}`;
      }
    }
  });
  return page || pageSize
    ? `?${filterUrl}${page ? `&page=${page}` : ''}${pageSize ? `&pageSize=${pageSize}` : ''}`
    : `?${filterUrl}&pagination=false`;
}
