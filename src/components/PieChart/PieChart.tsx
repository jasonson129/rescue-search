import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import styled from "@emotion/styled";

const Chart = styled.div`
  width: 100%;
  height: 100%;
`;

const PieChart = (props) => {
  let data = useSelector((state) => state.chartData);

  const init = () => {
    am4core.useTheme(am4themes_material);
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;

    chart.legend = new am4charts.Legend();

    chart.data = data;

    let series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "city";
  };

  useEffect(() => {
    init();
    return () => {
      am4core.disposeAllCharts();
    };
  });

  return <Chart id="chartdiv" />;
};

export default PieChart;
