import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';




const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel({records}) {
const types = {};
records.forEach((record) => {
  types[record.Type] = types[record.Type] ? types[record.Type] + 1 : 1;
});

const data = Object.keys(types).map((key) => ({
  label: key,
  value: types[key],
}));

const size = {
  width: 400,
  height: 200,
};
  return (
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>Records Type</PieCenterLabel>
    </PieChart>
  );
}
