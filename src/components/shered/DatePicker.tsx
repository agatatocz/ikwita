import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";
import { LoadingButton } from "components/shered/LoadingButton";
import { dateToYYYYMMDD } from "utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        marginBottom: "6px",
      },
    },
    formField: {
      margin: "0 1rem 1rem 0",
    },
  })
);

export interface DatePickerProps {
  dateFrom: Date;
  dateTo: Date;
  onDatesSubmit: (dateFrom: string, dateTo: string) => Promise<any>;
}

export const DatePicker: React.SFC<DatePickerProps> = ({
  dateFrom,
  dateTo,
  onDatesSubmit,
}) => {
  const [startDate, setStartDate] = useState<any>(dateFrom);
  const [endDate, setEndDate] = useState<any>(dateTo);
  const [loading, setLoading] = useState<boolean>(false);
  const classes = useStyles();

  const handleClick = () => {
    setLoading(true);
    const start =
      startDate instanceof Date ? dateToYYYYMMDD(startDate) : startDate;
    const end = endDate instanceof Date ? dateToYYYYMMDD(endDate) : endDate;
    onDatesSubmit(start, end).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className={classes.container}>
      <MuiDatePicker
        variant="inline"
        label="Od"
        format="dd/MM/yyyy"
        value={startDate}
        maxDate={new Date(endDate)}
        onChange={setStartDate}
        className={classes.formField}
      />
      <MuiDatePicker
        variant="inline"
        label="Do"
        format="dd/MM/yyyy"
        value={endDate}
        onChange={setEndDate}
        minDate={new Date(startDate)}
        className={classes.formField}
      />
      <LoadingButton onClick={handleClick} text="Odśwież" loading={loading} />
    </div>
  );
};
