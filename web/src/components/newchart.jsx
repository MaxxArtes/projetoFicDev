import React from 'react';
import { Chart } from 'react-google-charts';

const ChartComponent = () => {
  return (
    <div style={{width: "100vw", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Chart
        width={'100%'}
        height={'100%'}
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
