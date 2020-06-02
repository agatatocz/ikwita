import * as React from "react";
import { RouteChildrenProps, Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { LoadingButton } from "components/shered/LoadingButton";
import { ValidationSummary } from "components/Register/ValidationSummary";
import { AppContext } from "components/Context/DataProvider";
import { regExp, emailTemplate } from "utils/validationPatterns";
import { registerUser } from "services/registerUser";
import { setToken } from "services/auth";
import { routes } from "App";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: "1rem",
      marginBottom: "1rem",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    button: {
      margin: "1rem",
    },
    arrowContainer: {
      width: "100%",
      textAlign: "left",
      paddingLeft: "1rem",
    },
    link: {
      color: theme.palette.secondary.main,
    },
  })
);

export const RegisterForm: React.SFC<RouteChildrenProps> = ({ history }) => {
  const classes = useStyles();
  const { setUsersData } = React.useContext<any>(AppContext);

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass1, setPass1] = React.useState("");
  const [pass2, setPass2] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    if (username === "") {
      setError("Pole login jest wymagane");
      return false;
    }

    if (!emailTemplate.test(email)) {
      setError("Niepoprawny adres e-mail");
      return false;
    }

    if (pass1 !== pass2) {
      setError("Hasła nie są takie same.");
      return false;
    }

    if (!regExp.test(pass1)) {
      setError(
        "Hasło musi mieć minimum 8 znaków i zawierać małą literę [a-z], wielką literę [A-Z], cyfrę [0-9] oraz znak specjalny [!@#$%^&*]."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      registerUser(username, email, pass1)
        .then(async ({ data }) => {
          await setToken(data);
          setUsersData();
          history.push(routes.newWallet);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.container}>
        <form className={classes.container} onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5">
            Panel rejestracji
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            id="username"
            label="Login"
            type="text"
            required
            fullWidth
            autoFocus
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="login"
            label="E-mail"
            type="email"
            required
            fullWidth
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="password"
            type="password"
            label="Hasło"
            required
            fullWidth
            onChange={(event) => setPass1(event.currentTarget.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="password-confirmation"
            type="password"
            label="Potwierdź hasło"
            required
            fullWidth
            onChange={(event) => setPass2(event.currentTarget.value)}
          />
          <ValidationSummary message={error} />
          <LoadingButton
            text="Zarejestruj się"
            loading={loading}
            type="submit"
            fullWidth
            className={classes.button}
          />
        </form>
        <Typography>
          Masz już konto?{" "}
          <Link to={routes.login} className={classes.link}>
            Zaloguj się!
          </Link>
        </Typography>
      </div>
    </Container>
  );
};
