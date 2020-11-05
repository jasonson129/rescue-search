const reducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      let markers = [];
      let chartData = [];

      for (let payload of action.payload) {
        let marker = {
          position: [payload["origin_lat"], payload["origin_lng"]],
          date: payload["create_time"].substr(0, 10),
          orderId: payload["order_id"],
          location: payload["origin_address"],
          service: payload["service_name"],
        };
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
        markers.push(marker);
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
