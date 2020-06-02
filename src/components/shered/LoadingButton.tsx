import React from "react";
import { Button, CircularProgress, ButtonProps } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      marginLeft: "6px",
    },
  })
);

export interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  text: string;
}

export const LoadingButton: React.SFC<LoadingButtonProps> = ({
  loading,
  text,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Button variant="contained" color="primary" disabled={loading} {...rest}>
      {text}
      {loading && <CircularProgress className={classes.loader} size={16} />}
    </Button>
  );
};
