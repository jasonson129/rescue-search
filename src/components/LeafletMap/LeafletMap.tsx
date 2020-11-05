import React from "react";
import { useSelector } from "react-redux";
import { Map, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import styled from "@emotion/styled";
import state from "./assert/taiwanState.json";

const CustomMap = styled(Map)`
  height: 100%;
`;

const LeafletMap = (props) => {
  const markers = useSelector((state) => state.markers);

  const geoJsonRef = React.useRef<GeoJSON>(null);

  const mapRef = React.useRef<Map>(null);

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
    if (markers) {
      return (
        <MarkerClusterGroup>
          {markers.map((prop, key) => {
            const { position, service, date, location } = prop;
            return (
              <Marker position={position} key={key}>
                <Popup>
                  {"服務項目：" + service} <br />
                  {"時間：" + date}
                  <br />
                  {"地點：" + location}
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
