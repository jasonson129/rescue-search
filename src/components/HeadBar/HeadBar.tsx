import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "@emotion/styled";

const HeadBar = (props) => {
  const {
    drawerOpen,
    setDrawerOpen,
    dialogOpen,
    setDialogOpen,
    height,
  } = props;

  const defaultHeight = 50;

  const Root = styled.div`
    border: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    flex-grow: 1;
    height: ${height || defaultHeight}px;
  `;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        height: height || defaultHeight,
      },
      toolBar: {
        margin: 0,
        top: "50%",
        position: "absolute",
        transform: "translateY(-50%)",
      },
      iconButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    })
  );

  const classes = useStyles();

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleDialog = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <Root>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            edge="start"
            className={classes.iconButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDialog()}
          >
            <SearchIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" className={classes.title}>
            Rescue
          </Typography>
        </Toolbar>
      </AppBar>
    </Root>
  );
};

export default HeadBar;
