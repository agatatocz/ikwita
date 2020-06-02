import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AppContext } from "components/Context/DataProvider";

export interface DeleteWalletButtonProps {
  walletId: string;
  walletName: string;
  isPrivate: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: theme.palette.error.main,
    },
  })
);

export const DeleteWalletButton: React.SFC<DeleteWalletButtonProps> = ({
  walletId,
  walletName,
  isPrivate,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { deleteWallet } = React.useContext<any>(AppContext);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    closeDialog();
    deleteWallet(walletId, isPrivate);
  };
  return (
    <>
      <Button className={classes.button} onClick={openDialog}>
        Usuń portfel
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{`Usunięcie portfela jest akcją nieodwracalną.`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Jesteś pewien, że chcesz usunąć portfel: {walletName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary" autoFocus>
            Anuluj
          </Button>
          <Button onClick={handleConfirm} className={classes.button}>
            Usuń portfel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
