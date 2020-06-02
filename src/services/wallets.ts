import { http, endpoints } from "services/http";

export const getWallets = (
  userName: string,
  walletId?: string,
  dateFrom?: string,
  dateTo?: string
) =>
  http.get(endpoints.wallets, {
    params: {
      userName,
      ID: walletId,
      dateFrom,
      dateTo,
    },
  });

export const addWallet = (name: string, userName: string) =>
  http.post(endpoints.addWallet, {
    name,
    userName,
    currency: "PLN",
  });

export const editWallet = (walletId: string, name: string) =>
  http.post(`${endpoints.editWallet}?id=${walletId}`, {
    name,
  });

export const deleteWallet = (id: string) =>
  http.get(endpoints.deleteWallet, {
    params: {
      id,
    },
  });
