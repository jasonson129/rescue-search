import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Grid,
  Typography,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TransitionProps } from "@material-ui/core/transitions";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogSlide = (props) => {
  const dispatch = useDispatch();
  const { open, setOpen, title } = props;
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setMonth(new Date().getMonth() - 3))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  const fetchData = async () => {
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
        handleClose();
      });
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around" alignItems="baseline">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              value={startDate}
              format="yyyy/MM/dd"
              label="Start Date"
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <Typography variant="h5">~</Typography>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              value={endDate}
              format="yyyy/MM/dd"
              label="End Date"
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={fetchData} color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSlide;
