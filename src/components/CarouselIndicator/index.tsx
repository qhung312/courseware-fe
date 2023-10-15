const CarouselIndicator = (
  clickHandler: (e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
  isSelected: boolean,
  _index: number,
  _label: string
) => {
  return (
    <button
      className='mx-[2px] h-[4px] w-[20px] rounded-sm transition-colors 
      duration-700 ease-in-out md:mx-[6px] md:h-[6px] md:w-[30px] md:rounded-md
      xl:mx-[10px] xl:h-[10px] xl:w-[50px] xl:rounded-xl'
      style={{ backgroundColor: isSelected ? '#4285F4' : 'rgba(90, 90, 90, 0.5)' }}
      onClick={clickHandler}
    />
  );
};

export default CarouselIndicator;
