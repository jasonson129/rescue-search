import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Grid,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import styled from "@emotion/styled";
import DialogSlide from "../DialogSlide";

const HeadBar = (props) => {
  const { open, setOpen, headBarHeight, drawerWidth } = props;

  const defaultHeadBarHeight = 50,
    defaultDrawerWidth = 240;

  const Root = styled.div`
    border: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    flex-grow: 1;
    height: ${headBarHeight || defaultHeadBarHeight}px;
  `;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        height: headBarHeight || defaultHeadBarHeight,
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
      drawer: {
        top: headBarHeight || defaultHeadBarHeight,
        width: drawerWidth || defaultDrawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        top: headBarHeight || defaultHeadBarHeight,
        width: drawerWidth || defaultDrawerWidth,
        backgroundImage:
          "linear-gradient(to right, #5999da70, #5999da70), url('menu-background.jpg')",
        backgroundSize: "cover",
      },
    })
  );

  const classes = useStyles();

  const toggleDrawer = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    setOpen(!open);
  };

  const toggleDialog = () => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    setOpen(!open);
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
            onClick={toggleDrawer()}
          >
            <SearchIcon />
          </IconButton>
          <Typography variant="h5" color="inherit" className={classes.title}>
            Rescue
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor={"left"}
        open={false}
        onClose={toggleDrawer()}
        classes={{ paper: classes.drawerPaper }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" color="inherit" className={classes.title}>
              縣市
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Select>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Drawer>
    </Root>
  );
};

export default HeadBar;
