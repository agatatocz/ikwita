import * as React from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { LoadingButton } from "components/shered/LoadingButton";
import { AppContext } from "components/Context/DataProvider";
import Container from "@material-ui/core/Container";
import { routes } from "App";
import { toast } from "utils/toast";
import { AxiosError } from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "0.5rem",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    button: {
      margin: "1rem",
    },
    link: {
      color: theme.palette.secondary.light,
    },
  })
);

export const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { doLogIn } = React.useContext<any>(AppContext);
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    doLogIn(username, password).catch((error: AxiosError) => {
      if (error.response && error.response.status === 401)
        toast.error("Niepoprawny login lub hasło.");
      setLoading(false);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <form className={classes.container} onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5">
            Logowanie
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            id="login"
            label="Login"
            fullWidth
            autoFocus
            required
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="password"
            type="password"
            label="Hasło"
            fullWidth
            required
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
          <LoadingButton
            text="Zaloguj się"
            loading={loading}
            type="submit"
            fullWidth
            className={classes.button}
          />
        </form>
        <Typography>
          Nie masz konta?{" "}
          <Link to={routes.register} className={classes.link}>
            Zarejestruj się!
          </Link>
        </Typography>
      </div>
    </Container>
  );
};
