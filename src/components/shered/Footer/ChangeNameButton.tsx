import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppContext } from "components/Context/DataProvider";

export interface ChangeNameButtonProps {
  walletId: string;
  walletName: string;
  isPrivate: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loader: {
      marginLeft: "8px",
      width: "64px",
      textAlign: "center",
    },
  })
);

export const ChangeNameButton: React.SFC<ChangeNameButtonProps> = ({
  walletId,
  walletName,
  isPrivate,
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(walletName);
  const { editWallet } = React.useContext<any>(AppContext);
  const classes = useStyles();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
    setName(walletName);
  };
  const handleConfirm = () => {
    setLoading(true);
    editWallet(walletId, isPrivate, name).finally(() => {
      closeDialog();
      setLoading(false);
    });
  };
  return (
    <>
      <Button color="secondary" onClick={openDialog}>
        Zmień nazwę
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{`Wpisz nową nazwę portfela:`}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            autoFocus
            label="Nazwa"
            value={name}
            onChange={handleNameChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Anuluj
          </Button>
          {loading ? (
            <div className={classes.loader}>
              <CircularProgress size={16} />
            </div>
          ) : (
            <Button onClick={handleConfirm} color="primary" autoFocus>
              Zapisz
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
