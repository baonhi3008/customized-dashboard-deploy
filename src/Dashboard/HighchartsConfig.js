export default function(historical) {
  return {
    title: {
      text: "Rain Fall measurement"
    },

    yAxis: {
      title: {
        text: "mm"
      }
    },
    xAxis: { type: "datetime" },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle"
    },

    plotOptions: {
      series: {
		  name: "mm",
	        label: {

          connectorAllowed: false
        },
        pointStart: 2010
      }
    },

    series: historical,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom"
            }
          }
        }
      ]
    }
  };
}
