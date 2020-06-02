import * as React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Typography, Button } from "@material-ui/core";
import { routes } from "App";
import { AppContext } from "components/Context/DataProvider";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      padding: "2rem 2rem 1.5rem 3rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        padding: "1rem 1rem 1.5rem 2rem",
      },
    },
    logo: {
      fontFamily: "Lobster, cursive",
      color: `${theme.palette.primary.main}`,
      letterSpacing: "2px",
    },
    usernameContainer: {
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "0.5rem",
      },
    },
    logoutButton: {
      marginTop: "0.5rem",
      [theme.breakpoints.down("xs")]: {
        marginTop: 0,
        marginLeft: "0.5rem",
      },
    },
  })
);

export const Header = () => {
  const { user, doLogOut } = React.useContext<any>(AppContext);
  const classes = useStyles();
  return (
    <AppBar position="static" color="secondary">
      <div className={classes.appBar}>
        <Typography variant="h2" className={classes.logo}>
          i kwita.
        </Typography>
        {user && (
          <div className={classes.usernameContainer}>
            <Typography>{user.username}</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={doLogOut}
              component={Link}
              to={routes.empty}
              className={classes.logoutButton}
            >
              Wyloguj
            </Button>
          </div>
        )}
      </div>
    </AppBar>
  );
};
