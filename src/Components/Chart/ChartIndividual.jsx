import React, { Component } from "react";
import Chart from "react-apexcharts";

class ChartIndividualData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        title: {
          text: props.title,
          align: "left",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        colors: props.color,
      },
      series: props.data,
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type={this.props.type}
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartIndividualData;
