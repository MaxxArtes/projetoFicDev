import React from 'react';
import ReactApexChart from 'react-apexcharts';

class MyChart extends React.Component {

    

  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'andamento',
          data: [5, 1],
        },
        {
          name: 'finalizado',
          data: [3, 2],
        },
        
      ],
      options: {
        chart: {
          height: 800,
          width: 1500,
          type: 'area',
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'text',
          categories: [
            'setembro',
            'outubro',
          ],
        },
        
      },
    };
  }


  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height="800px"
          width="1500px"

        />
      </div>
    );
  }
}

export default MyChart;
