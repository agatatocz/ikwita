import { http, endpoints } from "services/http";

export const addIncome = (
  name: string,
  value: number,
  date: string,
  categoryID: number,
  walletID: string
) =>
  http.post(endpoints.addIncome, {
    name,
    value,
    date,
    categoryID,
    walletID,
  });

export const editIncome = (
  incomeID: number | string,
  name: string,
  value: number,
  date: string,
  categoryID: number,
  walletID: string
) =>
  http.post(`${endpoints.editIncome}?id=${incomeID}`, {
    name,
    value,
    date,
    categoryID,
    walletID,
  });

export const deleteIncome = (incomeID: number | string) =>
  http.get(`${endpoints.deleteIncome}?id=${incomeID}`);
