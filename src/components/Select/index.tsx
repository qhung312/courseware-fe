import _ from 'lodash';
import { FC, useEffect, useRef, useState } from 'react';

import Icon from '../Icon';

type SelectProps = {
  options: string[];
  isSearchable?: boolean;
  placeholder?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  listClassName?: string;
  state?: string;
  setState?: (value: string) => void;
};

const Select: FC<SelectProps> = ({
  options,
  isSearchable = false,
  placeholder = 'Placeholder',
  wrapperClassName = '',
  inputClassName = '',
  listClassName = '',
  state = '',
  setState = () => undefined,
}) => {
  const [ops, setOps] = useState(options);
  const [value, setValue] = useState<string>(state);
  const [display, setDisplay] = useState<'hidden' | 'list-item'>('hidden');
  const inputRef = useRef<HTMLInputElement>(null);
  const chevronRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      e.stopPropagation();

      if (inputRef.current?.contains(e.target as Node)) {
        setDisplay('list-item');
        chevronRef.current?.classList.remove('rotate-180');
      } else if (
        !inputRef.current?.contains(e.target as Node) &&
        !chevronRef.current?.contains(e.target as Node)
      ) {
        setDisplay('hidden');
        chevronRef.current?.classList.add('rotate-180');
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(state);
  }, [state]);

  useEffect(() => {
    const deboucedFunc = _.debounce(
      () => setOps(options.filter((op) => op.toLowerCase().includes(value.toLowerCase()))),
      300
    );
    deboucedFunc();
    return deboucedFunc.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={`relative flex flex-row items-center ${wrapperClassName}`}>
      <input
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={({ target }) => {
          if (isSearchable) {
            setValue(target.value);
          }
        }}
        className={`
        ${isSearchable ? '' : 'cursor-default caret-transparent'} ${inputClassName}
        flex flex-1 rounded-lg border border-[#CCC] bg-white p-1 text-xs font-medium
        lg:p-3 lg:text-sm 3xl:p-5 3xl:text-base`}
      />
      <button
        type='button'
        ref={chevronRef}
        onClick={() => {
          setDisplay(display === 'hidden' ? 'list-item' : 'hidden');
          chevronRef.current?.classList.toggle('rotate-180');
          display === 'hidden' ? inputRef.current?.focus() : inputRef.current?.blur();
        }}
        className='absolute right-1 h-4 rotate-180 transition-all duration-300 lg:right-3 lg:h-5 3xl:right-5 3xl:h-6'
      >
        <Icon.Chevron fill='#5B5B5B' height={'100%'} />
      </button>
      <ul
        className={`absolute top-[calc(100%+8px)] max-h-[400px] w-[200%] 
        overflow-hidden overflow-y-scroll rounded-lg border border-[#CCC] bg-white p-1 
        transition-all duration-300 lg:p-3 3xl:p-5
        ${display === 'hidden' ? '-z-10 opacity-0' : 'z-3 opacity-100'}
        ${listClassName}`}
      >
        {ops.map((option) => (
          <li key={option} className='lg:pb-2 3xl:pb-4'>
            <button
              type='button'
              onClick={() => {
                setDisplay('hidden');
                setValue(option);
                setState(option);
              }}
            >
              <p className='text-xs font-normal lg:text-sm 3xl:text-base'>{option}</p>
            </button>
          </li>
        ))}
        <li className={`${ops.length ? 'border-t border-[#CCC] pt-[1px]' : ''}`}>
          <button
            type='button'
            disabled={!ops.length}
            onClick={() => {
              setDisplay('hidden');
              setValue('');
              setState('');
            }}
          >
            <p className='text-xs font-normal lg:text-sm 3xl:text-base'>
              {ops.length ? 'Xoá lựa chọn' : 'Không có lựa chọn'}
            </p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Select;
