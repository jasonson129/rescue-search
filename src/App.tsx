import React, { useState } from "react";
import HeadBar from "./components/HeadBar";
import LeafletMap from "./components/LeafletMap";
import styled from "@emotion/styled";
import "./App.css";

const drawerWidth = 300;

const headBarHeight = 50;

const App = () => {
  const [open, setOpen] = useState(false);

  const View = styled.div`
    position: relative;
    top: ${headBarHeight}px;
    height: calc(100vh - ${headBarHeight}px);
    left: ${open ? drawerWidth : `0`}px;
    width: calc(100vw - ${open ? drawerWidth : `0`}px);
  `;

  return (
    <>
      <HeadBar
        open={open}
        setOpen={setOpen}
        headBarHeight={headBarHeight}
        drawerWidth={drawerWidth}
      />
      <View>
        <LeafletMap />
      </View>
    </>
  );
};

export default App;
