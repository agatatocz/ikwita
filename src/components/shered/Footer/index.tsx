import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DeleteWalletButton } from "./DeleteWalletButton";
import { ChangeNameButton } from "./ChangeNameButton";

export interface FooterProps {
  walletId: string;
  walletName: string;
  isPrivate: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      width: "90%",
      textAlign: "center",
      marginTop: "1rem",
      borderTop: "1px #ccc solid",
      padding: "0.5rem",
      marginLeft: "auto",
      marginRight: "auto",
    },
  })
);

export const Footer: React.SFC<FooterProps> = ({
  walletId,
  walletName,
  isPrivate,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <ChangeNameButton
        walletId={walletId}
        walletName={walletName}
        isPrivate={isPrivate}
      />
      <DeleteWalletButton
        walletId={walletId}
        walletName={walletName}
        isPrivate={isPrivate}
      />
    </div>
  );
};
