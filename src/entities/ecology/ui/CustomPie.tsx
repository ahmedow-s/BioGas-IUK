import { Pie, PieChart, type PieLabelRenderProps, type PieSectorShapeProps, Sector } from 'recharts';

const data = [
  { name: 'Group A', value: 2000 ,percentLabel: 57 },
  { name: 'Group B', value: 1000 ,percentLabel: 33 },
  { name: 'Group C', value: 700  ,percentLabel: 12 },
  { name: 'Group D', value: 800,  percentLabel: 20 },
];

const RADIAN = Math.PI / 180;
const COLORS = ['#A3E635','#77B510',  '#18CF5E', '#1E7F43',];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: PieLabelRenderProps) => {
  if (cx == null || cy == null || innerRadius == null || outerRadius == null || index == null) {
    return null;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const ncx = Number(cx);
  const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const ncy = Number(cy);
  const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
      {data[index].percentLabel}%
    </text>
  );
};

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
};

export default function PieChartWithCustomizedLabel({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  return (
    <PieChart style={{  width: '234px', height: '234px', aspectRatio: 1 }} responsive>
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
        isAnimationActive={isAnimationActive}
        shape={MyCustomPie}
        startAngle={90}
        endAngle={-360}
      />
    </PieChart>
  );
} 