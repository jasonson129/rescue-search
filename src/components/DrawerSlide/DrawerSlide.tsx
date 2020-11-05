import React, { useCallback } from "react";
import { Drawer } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "@emotion/styled";

const Dragger = styled.div`
  width: 3px;
  cursor: ew-resize;
  padding: 4px 0 0;
  border-top: 1px solid #ddd;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 100;
  background-color: #033bb7;
`;

const DrawerSlide = (props) => {
  const [drawerWidth, setDrawerWidth] = React.useState(300);

  const { open, setOpen, style, children } = props;

  const minDrawerWidth = 300,
    maxDrawerWidth = window.innerWidth / 2;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      drawer: {
        ...style,
        flexShrink: 0,
      },
      drawerPaper: {
        ...style,
        width: open ? drawerWidth : 0,
        backgroundSize: "cover",
      },
    })
  );

  const classes = useStyles();

  const handleClose = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    setOpen(false);
  };

  const handleMouseDown = (e) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      const newWidth = e.clientX - document.body.offsetLeft;
      if (newWidth >= minDrawerWidth && newWidth <= maxDrawerWidth) {
        setDrawerWidth(newWidth);
      }
    },
    [maxDrawerWidth]
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={handleClose()}
      classes={{ paper: classes.drawerPaper }}
    >
      {children}
      <Dragger onMouseDown={(e) => handleMouseDown(e)} />
    </Drawer>
  );
};

export default DrawerSlide;
