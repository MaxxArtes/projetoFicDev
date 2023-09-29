import React from 'react';
import { Chart } from 'react-google-charts';

const ChartComponent = () => {
  return (
    <div>
      <Chart
        width={'400px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['atendentes', 'Slices'],
          ['medicos', 3],
          ['atendimentos', 1],
          ['consultas', 1],
        ]}
        options={{
          title: '',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
};

export default ChartComponent;
