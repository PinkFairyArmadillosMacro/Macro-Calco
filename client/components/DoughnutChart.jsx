import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ArcElement);
Chart.register(ChartDataLabels)

const DoughnutChart = (props) => {
  const {data} = props
  const dataInfo = {
    labels: [
      'Protein',
      'Fat',
      'Carbs'
    ],
    datasets: [{
      labels: ['red', 'green', 'blue'],
      data: data,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 3
    }]
  };
  return (
    <div>
      <Doughnut 
      data={dataInfo}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Users Gained between 2016-2020"
          },
          datalabels: {
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              },
              value: {
                color: 'white'
              }
            }
          },
          labels: {
            render: 'labels'
          }
        }
      }}
      />
    </div>
  )

}

export default DoughnutChart;