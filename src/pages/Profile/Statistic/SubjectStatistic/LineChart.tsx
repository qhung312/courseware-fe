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

const data = [
  {
    name: '01/07',
    Điểm: 5.47,
  },
  {
    name: '02/07',
    Điểm: 6.78,
  },
  {
    name: '03/07',
    Điểm: 9.67,
  },
  {
    name: '04/07',
    Điểm: 7.88,
  },
  {
    name: '05/07',
    Điểm: 10.0,
  },
  {
    name: '06/07',
    Điểm: 3.67,
  },
  {
    name: '07/07',
    Điểm: 8.45,
  },
];

const RenderLineChart = () => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='Điểm' stroke='#8884d8' activeDot={{ r: 8 }} />
        {/* <Line type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RenderLineChart;
