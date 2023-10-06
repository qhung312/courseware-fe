import TinySlider from 'tiny-slider-react';

export const Home = () => {
  const settings = {
    lazyload: true,
    nav: true,
    mouseDrag: true,
  };

  return (
    <main>
      <TinySlider settings={settings}></TinySlider>
    </main>
  );
};

export default Home;
