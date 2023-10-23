import { usePagination } from '../../hooks';
import Icon from '../Icon';

type Props = {
  totalCount: number;
  pageSize?: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
};

const Pagination = ({ totalCount, pageSize = 10, currentPage, onPageChange }: Props) => {
  const pageRange = usePagination({ totalCount, pageSize: pageSize, siblingCount: 1, currentPage });
  if ((pageRange?.length || 0) < 1) return null;

  return (
    <ul className='my-4 flex flex-1 flex-row items-center justify-center gap-x-4'>
      <li>
        <button
          className={`rounded-full p-2 ${currentPage === 1 ? '' : 'hover:bg-black/20'}`}
          disabled={currentPage === pageRange?.[0]}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Icon.Chevron fill='#5B5B5B' className='-rotate-90' />
        </button>
      </li>

      {pageRange?.map((pageNumber, index) => {
        if (pageNumber === 'DOTS') {
          return <li key={`pagination-${pageNumber}-${index}`}>...</li>;
        }

        return (
          <li key={`pagination-${pageNumber}`}>
            <button
              className={`aspect-square rounded-full p-2 ${
                pageNumber === currentPage ? 'bg-[#4285F4]/90' : 'hover:bg-black/20'
              }`}
              onClick={() => onPageChange(pageNumber as number)}
            >
              <p
                className={`w-7 text-lg ${
                  pageNumber === currentPage ? 'font-semibold text-white' : 'font-medium'
                }`}
              >
                {pageNumber}
              </p>
            </button>
          </li>
        );
      })}
      <li>
        <button
          className={`rounded-full p-2 ${
            currentPage === (pageRange?.[pageRange?.length - 1] as number)
              ? ''
              : 'hover:bg-black/20'
          }`}
          disabled={currentPage === (pageRange?.[pageRange?.length - 1] as number)}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <Icon.Chevron fill='#5B5B5B' className='rotate-90' />
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
