import * as React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AppContext } from "components/Context/DataProvider";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
      padding: "2rem",
      textAlign: "center",
    },
  })
);

interface WithLoadingProps {}
export const withLoading = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & WithLoadingProps> => (props: WithLoadingProps) => {
  const { loading } = React.useContext<any>(AppContext);
  const classes = useStyles();
  return loading ? (
    <div className={classes.container}>
      <CircularProgress size={60} />
    </div>
  ) : (
    <Component {...(props as P)} />
  );
};
