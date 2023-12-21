import * as d3 from 'd3-array';
import { FC } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { useWindowDimensions } from '../../hooks';

export type HistogramProps = {
  scores: number[];
};

const Histogram: FC<HistogramProps> = ({ scores }) => {
  const { width, height } = useWindowDimensions();

  const bin = d3
    .bin()
    .domain([0, 10])
    .thresholds(width < 400 ? 5 : 10);

  const data = bin(scores);

  return (
    <ResponsiveContainer width='100%' height={height * 0.4} className='mt-5'>
      <BarChart
        data={data.map((value) => ({ range: `${value.x0} - ${value.x1}`, total: value.length }))}
        margin={{ top: 16, right: width < 400 ? 0 : 20, left: width < 400 ? 0 : 20, bottom: 0 }}
        barCategoryGap={8}
      >
        <XAxis dataKey='range' tickMargin={8} padding={{ left: 16 }} />
        <YAxis allowDecimals={false} tickMargin={8} />
        <Legend height={24} />
        <Bar
          dataKey='total'
          fill='#4285F4'
          name='Số thí sinh'
          label={{ position: 'top', fill: '#252641' }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Histogram;
