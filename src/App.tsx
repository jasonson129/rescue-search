import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import HeadBar from "./components/HeadBar";
import DrawerSlide from "./components/DrawerSlide";
import DialogSlide from "./components/DialogSlide";
import LeafletMap from "./components/LeafletMap";
import PieChart from "./components/PieChart";
import styled from "@emotion/styled";
import axios from "axios";
import "./App.css";

const headBarHeight = 50;

const App = () => {
  let dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchData = useCallback(
    (startDate, endDate) => {
      const fetchingData = async (startDate, endDate) => {
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
            dispatch({
              type: "FETCH_DATA",
              payload: response.data.data,
            });
          });
      };
      fetchingData(startDate, endDate);
    },
    [dispatch]
  );

  useEffect(() => {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);
    let endDate = new Date();
    fetchData(
      startDate.toISOString().substring(0, 10),
      endDate.toISOString().substring(0, 10)
    );
  }, [fetchData]);

  const Root = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
  `;

  const Map = styled.div`
    position: relative;
    top: ${headBarHeight}px;
    height: calc(100vh - ${headBarHeight}px);
  `;

  return (
    <Root>
      <HeadBar
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        height={headBarHeight}
      />
      <DialogSlide
        open={dialogOpen}
        setOpen={setDialogOpen}
        title={"Set Query Date"}
      />
      <DrawerSlide
        open={drawerOpen}
        setOpen={setDrawerOpen}
        anchor={"left"}
        style={{
          top: headBarHeight,
          resize: "horizontal",
          backgroundColor: "#5999dad9",
          overflow: "auto",
        }}
      >
        <PieChart />
      </DrawerSlide>
      <Map>
        <LeafletMap />
      </Map>
    </Root>
  );
};

export default App;
