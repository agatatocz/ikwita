import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "components/Context/DataProvider";
import { PrivateWallet as PrivateWalletInterface } from "interfaces/privateWallet";
import { SheredWallet as SheredWalletInterface } from "interfaces/sheredWallet";
import { PrivateWallet } from "./PrivateWallet";
import { SheredWallet } from "./SheredWallet";
import { withLoading } from "components/shered/LoadingWrapper";

export interface WalletProps {
  match: { params: { id: number } };
}

export const RawWallet: React.SFC<WalletProps> = ({ match: { params } }) => {
  const { getWallet } = useContext<any>(AppContext);
  const [wallet, setWallet] = useState<
    PrivateWalletInterface | SheredWalletInterface
  >(getWallet(params.id));

  useEffect(() => {
    setWallet(getWallet(params.id));
  }, [params.id, getWallet]);

  return wallet ? (
    wallet.isPrivate ? (
      <PrivateWallet wallet={wallet as PrivateWalletInterface} />
    ) : (
      <SheredWallet wallet={wallet as SheredWalletInterface} />
    )
  ) : null;
};

export const Wallet = withLoading(RawWallet);
