import { debounce, isEmpty, isNumber } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Icon } from '..';
import { useWindowDimensions } from '../../hooks';

interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  buttonClassName?: string;
  controllerClassName?: string;
}

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  min = -Infinity,
  max = Infinity,
  onChange,
  containerClassName = '',
  className: inputClassName = '',
  controllerClassName = '',
  placeholder,
  buttonClassName = '',
  ...props
}) => {
  if (typeof value !== 'number') {
    throw new Error('value must be a number');
  }

  const [rawValue, setRawValue] = useState<string>(
    value !== 0 && isNaN(value) ? String(value) : isEmpty(placeholder) ? String(min) : ''
  );
  const processedValue = rawValue !== '' ? rawValue : isEmpty(placeholder) ? String(min) : '';

  const { width } = useWindowDimensions();
  const [controllerWidth, setControllerWidth] = useState<number>(0);
  const [inputPadding, setInputPadding] = useState<number>(0);
  const controllerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setControllerWidth(controllerRef.current?.getBoundingClientRect().width || 0);
    setInputPadding(
      inputRef.current
        ? parseFloat(window.getComputedStyle(inputRef.current as Element).paddingLeft)
        : 0
    );
  }, [width]);

  const handleChange = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      const text = event.target.value;

      if (text === '-' || text === '') {
        setRawValue(text);
        onChange?.({ ...event, target: { ...event.target, value: '' } });
      } else if (isNumber(Number(text))) {
        const newValue = Number(text);
        if (newValue >= Number(min) && newValue <= Number(max)) {
          onChange?.(event);
          setRawValue(text);
        } else if (newValue < Number(min)) {
          onChange?.({ ...event, target: { ...event.target, value: String(max) } });
          setRawValue(String(max));
        } else {
          onChange?.({ ...event, target: { ...event.target, value: String(min) } });
          setRawValue(String(min));
        }
      }
    },
    700,
    { leading: true }
  );

  const handleBlur = useCallback(() => {
    if (processedValue === '' || processedValue === '-') {
      setRawValue('');
      onChange?.({ target: { value: String(min) } } as any);
    }
  }, [processedValue, onChange, min]);

  const mergedContainerClassName = twMerge('relative flex flex-1 w-full h-fit', containerClassName);
  const mergedInputClassName = twMerge('w-full h-fit', inputClassName);
  const mergedControllerClassName = twMerge(
    `absolute right-0 top-0 flex h-full flex-col border-l opacity-0
    transition-opacity duration-300 ease-in`,
    controllerClassName
  );
  const mergedButtonClassName = twMerge(
    'pl-[3px] py-[3px] lg:py-2 pr-1 fill-[#252641]',
    buttonClassName
  );

  return (
    <div
      className={mergedContainerClassName}
      onMouseEnter={() => {
        controllerRef.current?.classList.remove('opacity-0');
      }}
      onMouseLeave={() => {
        controllerRef.current?.classList.add('opacity-0');
      }}
      onFocusCapture={() => {
        inputRef.current?.focus();
        controllerRef.current?.classList.remove('opacity-0');
      }}
      onBlurCapture={() => {
        inputRef.current?.blur();
        controllerRef.current?.classList.add('opacity-0');
      }}
    >
      <input
        ref={inputRef}
        className={mergedInputClassName}
        value={processedValue}
        onBlur={handleBlur}
        type='text'
        onChange={handleChange}
        placeholder={placeholder}
        style={{
          paddingRight:
            controllerWidth && inputPadding ? `${Number(controllerWidth) + inputPadding}px` : '0px',
        }}
        {...props}
      />
      <div
        ref={controllerRef}
        className={mergedControllerClassName}
        style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}
      >
        <button
          className={`h-[calc(50%-0.5px)] w-full transition-all duration-300 ease-in ${
            Number(processedValue) === Number(max) ? 'opacity-50' : 'hover:bg-[#F1F1F1]'
          } ${mergedButtonClassName}`}
          disabled={Number(processedValue) === Number(max)}
          style={{
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
          }}
          onClick={() => {
            if (processedValue === '' || processedValue === '-') {
              setRawValue(String(min));
              onChange?.({ target: { value: String(min) } } as any);
            } else {
              const newValue = Number(processedValue) + 1;
              setRawValue(String(newValue));
              onChange?.({ target: { value: String(newValue) } } as any);
            }
          }}
        >
          <Icon.ChevronUp className='h-full w-auto fill-inherit' />
        </button>
        <span className='block h-fit w-full border-b border-[#CCC]' />
        <button
          className={`h-[calc(50%-0.5px)] w-full transition-all duration-300 ease-in ${
            Number(processedValue) === Number(min) ? 'opacity-50' : 'hover:bg-[#F1F1F1] '
          } ${mergedButtonClassName}`}
          style={{
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            borderBottomLeftRadius: '0px',
          }}
          disabled={Number(processedValue) === Number(min)}
          onClick={() => {
            if (processedValue === '' || processedValue === '-') {
              setRawValue(String(min));
              onChange?.({ target: { value: String(min) } } as any);
            } else {
              const newValue = Number(processedValue) - 1;
              setRawValue(String(newValue));
              onChange?.({ target: { value: String(newValue) } } as any);
            }
          }}
        >
          <Icon.ChevronUp className='h-full w-auto rotate-180 fill-inherit' />
        </button>
      </div>
    </div>
  );
};

export default InputNumber;
