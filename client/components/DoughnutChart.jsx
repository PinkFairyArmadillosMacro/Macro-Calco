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
      label: 'My First Dataset',
      data: data,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
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
            color: 'blue',
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              },
              value: {
                color: 'green'
              }
            }
          }
        } 
      }}
      />
    </div>
  )

}

export default DoughnutChart;