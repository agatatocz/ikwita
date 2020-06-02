import React, { useState, useContext, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import { routes } from "../../App";
import { AppContext } from "components/Context/DataProvider";
import { Wallet } from "interfaces/wallet";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    newWallet: {
      display: "flex",
    },
    icon: {
      marginRight: "0.5rem",
    },
  })
);

export interface MenuProps {
  match: {
    params: { id: string };
    path: string;
  };
}

export const Menu: React.SFC<MenuProps> = ({ match: { params, path } }) => {
  const classes = useStyles();
  const { user, wallets } = useContext<any>(AppContext);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (params.hasOwnProperty("id")) {
      const index = wallets.findIndex(
        (wallet: Wallet) => `${wallet.id}` === params.id
      );
      if (index > -1) setTabIndex(index);
    } else if (path === routes.newWallet) setTabIndex(wallets.length);
  }, [params, wallets, path]);

  const handleChange = (event: React.ChangeEvent<{}>, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };
  return user ? (
    <AppBar position="static" color="secondary">
      <Tabs
        value={tabIndex}
        indicatorColor="primary"
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {wallets.map((wallet: Wallet) => (
          <Tab
            component={Link}
            to={`${routes.wallet}/${wallet.id}`}
            label={wallet.name}
            key={`${wallet.name}-${wallet.id}`}
          />
        ))}
        <Tab
          component={Link}
          to={routes.newWallet}
          label={
            <div className={classes.newWallet}>
              <AddCircleIcon className={classes.icon} />
              Dodaj nowy portfel
            </div>
          }
        />
      </Tabs>
    </AppBar>
  ) : null;
};
