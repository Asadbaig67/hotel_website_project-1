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
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     options: {
  //       chart: {
  //         id: "basic-bar",
  //         toolbar: {
  //           show: false,
  //         },
  //       },
  //       title: {
  //         text: props.title,
  //         align: "left",
  //         style: {
  //           fontSize: "12px",
  //           fontWeight: "bold",
  //         },
  //       },
  //       xaxis: {
  //         categories: [
  //           "Jan",
  //           "Feb",
  //           "Mar",
  //           "Apr",
  //           "May",
  //           "Jun",
  //           "Jul",
  //           "Aug",
  //           "Sep",
  //           "Oct",
  //           "Nov",
  //           "Dec",
  //         ],
  //         labels: {
  //           style: {
  //             fontSize: "10px",
  //           },
  //         },
  //       },
  //       colors: props.color,
  //       responsive: [
  //         {
  //           breakpoint: 576, // screens smaller than 576px
  //           options: {
  //             chart: {
  //               height: 250,
  //             },
  //           },
  //         },
  //         {
  //           breakpoint: 768, // screens between 576px and 768px
  //           options: {
  //             chart: {
  //               height: 300,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     series: props.data,
  //   };
  // }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type={this.props.type}
              height={350}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartIndividualData;
