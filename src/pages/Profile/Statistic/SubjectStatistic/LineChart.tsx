import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { ChartData } from '.';

type RenderLineChartProps = {
  data: ChartData[];
};

const RenderLineChart: React.FC<RenderLineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='dateString' />
        <YAxis type='number' domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='Điểm' stroke='#4285F4' activeDot={{ r: 8 }} />
        {/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RenderLineChart;
