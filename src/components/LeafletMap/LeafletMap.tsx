import React from "react";
import { Map, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import styled from "@emotion/styled";
import state from "./assert/taiwanState.json";
import axios from "axios";

const CustomMap = styled(Map)`
  height: 100%;
`;

const LeafletMap = (props) => {
  React.useEffect(() => {
    fetchData("2020-01-01", "2020-10-31");
  }, []);

  const [marker, setMarker] = React.useState<any[]>();

  const geoJsonRef = React.useRef<GeoJSON>(null);

  const mapRef = React.useRef<Map>(null);

  const fetchData = (startDate, endDate) => {
    axios
      .get(
        "https://gw.openapi.org.tw/bba1fd90-6423-11ea-9c78-6d4b75d0df63/TMS?client_id=0f978980-18c7-11eb-936f-e7de9d1d0683&client_secret=oWNVkU%2BW1PyC09PHJJjW3jXJyOy2%2BqQV5D1sARe114w%3D",
        {
          params: {
            create_time_S: startDate,
            create_time_E: endDate,
          },
        }
      )
      .then((response) => {
        setMarkerData(response.data.data);
      });
  };

  const setMarkerData = (data) => {
    let markers = [];

    for (let d of data) {
      let marker = {
        position: [d["origin_lat"], d["origin_lng"]],
        date: d["create_time"].substr(0, 10),
        orderId: d["order_id"],
        location: d["origin_address"],
        service: d["service_name"],
      };
      markers.push(marker);
    }
    setMarker(markers);
  };

  const highlightFeature = (e) => {
    let layer = e.target;

    layer.setStyle({
      weight: 3,
      color: "rgba(255,255,255,0.3)",
      dashArray: "",
      fillOpacity: 0.7,
    });
  };

  const resetHighlight = (e) => {
    geoJsonRef.current!.leafletElement.resetStyle(e.target);
  };

  const zoomToFeature = (e) => {
    mapRef.current!.leafletElement.fitBounds(e.target.getBounds());
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  };

  const getMarker = () => {
    if (marker) {
      return (
        <MarkerClusterGroup>
          {marker.map((prop, key) => {
            return (
              <Marker position={prop.position} key={key}>
                <Popup>
                  {/* {"編號：" + prop.orderId} <br /> */}
                  {"服務項目：" + prop.service} <br />
                  {"時間：" + prop.date}
                  <br />
                  {"地點：" + prop.location}
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      );
    }
  };

  return (
    <CustomMap
      className="markercluster-map"
      center={[23.6, 121]}
      zoom={8}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
      />
      <GeoJSON data={state} onEachFeature={onEachFeature} ref={geoJsonRef} />
      {getMarker()}
    </CustomMap>
  );
};

export default LeafletMap;
