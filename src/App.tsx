import React, { useState } from "react";
import HeadBar from "./components/HeadBar";
import DrawerSlide from "./components/DrawerSlide";
import DialogSlide from "./components/DialogSlide";
import LeafletMap from "./components/LeafletMap";
import PieChart from "./components/PieChart";
import styled from "@emotion/styled";
import "./App.css";

const headBarHeight = 50;

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const Map = styled.div`
    position: relative;
    top: ${headBarHeight}px;
    height: calc(100vh - ${headBarHeight}px);
  `;

  return (
    <>
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
    </>
  );
};

export default App;
