import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PRIVATE, SHERED } from "utils/constants";
import { AddUsersTable, NewUser } from "./AddUsersTable";
import { LoadingButton } from "components/shered/LoadingButton";
import { AppContext } from "components/Context/DataProvider";
import { withLoading } from "components/shered/LoadingWrapper";

const NAME_ERROR = "Nazwa portfela jest wymagana.";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: "2rem",
      padding: "1rem 2rem",
      [theme.breakpoints.down("xs")]: {
        margin: "0.5rem",
        padding: "1rem",
      },
    },
    radioGroupContainer: {
      padding: "1rem 0",
      display: "flex",
      flexDirection: "column",
      height: "200px",
      maxWidth: "250px",
      justifyContent: "space-between",
    },
    buttonContainer: {
      width: "100%",
      textAlign: "center",
      padding: "1rem",
    },
    loader: {
      marginLeft: "6px",
    },
  })
);

export interface NewWalletCreatorProps {}

export const RawNewWalletCreator: React.SFC<NewWalletCreatorProps> = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [type, setType] = useState(PRIVATE);
  const [users, setUsers] = useState<Array<NewUser>>([]);
  const [loading, setLoading] = useState(false);
  const { addPrivateWallet, addSheredWallet } = React.useContext<any>(
    AppContext
  );

  const classes = useStyles();
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError("");
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      setLoading(true);
      if (type === PRIVATE)
        addPrivateWallet(name).catch(() => {
          setLoading(false);
        });
      if (type === SHERED) {
        const usersNames = users.map((user) => user.username);
        addSheredWallet(name, usersNames).catch(() => {
          setLoading(false);
        });
      }
    }
  };
  const validate = () => {
    if (name.trim() === "") {
      setNameError(NAME_ERROR);
      return false;
    }
    setNameError("");
    return true;
  };

  return (
    <Card className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div className={classes.radioGroupContainer}>
          <TextField
            error={!!nameError}
            label="Nazwa"
            value={name}
            onChange={handleNameChange}
            helperText={nameError}
          ></TextField>
          <RadioGroup value={type} onChange={handleRadioChange}>
            <FormControlLabel
              value={PRIVATE}
              control={<Radio />}
              label="Portfel prywatny"
            />
            <FormControlLabel
              value={SHERED}
              control={<Radio />}
              label="Portfel współdzielony"
            />
          </RadioGroup>
        </div>
        {type === SHERED && (
          <AddUsersTable users={users} setUsers={setUsers}></AddUsersTable>
        )}
        <div className={classes.buttonContainer}>
          <LoadingButton type="submit" loading={loading} text="Utwórz" />
        </div>
      </form>
    </Card>
  );
};

export const NewWalletCreator = withLoading(RawNewWalletCreator);
