import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const MyStockChart = props => {
  const options = {
    chart: {
      type: 'bar',
      plotBackgroundColor: '#deedf9',
      backgroundColor: '#deedf9'
    },
    title: {
      text: 'Tone'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: [
        'Anger',
        'Fear',
        'Joy',
        'Sadness',
        'Analytical',
        'Confident',
        'Tentative'
      ],

      title: {
        text: null
      }
    },
    yAxis: {
      min: 50,
      max: 100,
      title: {
        text: '',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      },
      gridLineColor: '#ACCBE2'
    },
    tooltip: {
      valueSuffix: ' Percent'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    // legend: {
    //   layout: 'vertical',
    //   align: 'right',
    //   verticalAlign: 'top',
    //   x: -40,
    //   y: 80,
    //   floating: true,
    //   borderWidth: 1,
    //   backgroundColor:
    //     (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
    //   shadow: true
    // },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Tone',
        data: [10, 10, 10, 10, 10]
      }
    ]
  }
  console.log(options.series[0].data)
  console.log(props)
  options.series[0].data = props.data
  return <HighchartsReact highcharts={Highcharts} options={options} />
}

export default MyStockChart
