const setMarker = (payload) => {
  return {
    position: [payload["origin_lat"], payload["origin_lng"]],
    date: payload["create_time"].substr(0, 10),
    orderId: payload["order_id"],
    location: payload["origin_address"],
    service: payload["service_name"],
  };
};

const setChartData = (chartData, payload) => {
  let city = payload["origin_address_city"];
  let cityData = chartData.find((chart) => chart.city === city);
  if (cityData) {
    cityData.value++;
  } else {
    chartData.push({
      city: city,
      value: 1,
    });
  }
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      let markers = [];
      let chartData = [];

      for (let payload of action.payload) {
        setChartData(chartData, payload);
        markers.push(setMarker(payload));
      }
      return {
        markers: markers,
        chartData: chartData,
      };
    default:
      return state;
  }
};

export default reducer;
