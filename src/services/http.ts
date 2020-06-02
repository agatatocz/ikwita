import axios from "axios";
import { getToken } from "services/auth";
import { toast } from "utils/toast";
import { isString } from "utils";

const instance = axios.create({
  baseURL: "https://ikwita-api.azurewebsites.net",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.message) toast.success(response.data.message);
    return response;
  },
  (error) => {
    console.log({ ...error });
    if (error.response && error.response.data && isString(error.response.data))
      toast.error(error.response.data);
    else if (error.response && error.response.data && error.response.data.info)
      toast.error(error.response.data.info);
    else if (
      error.response &&
      error.response.data &&
      error.response.data.message
    )
      toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

export const http = instance;
export const endpoints = {
  register: "/account/register",
  login: "/account/login",
  exist: "/account/exist",
  wallets: "/wallets",
  groups: "/groups",
  groupsGet: "/groups/get",
  groupsAddUsers: "/groups/addUsers",
  groupsDeleteUsers: "/groups/deleteUser",
  addWallet: "/wallets/add",
  deleteWallet: "/wallets/remove",
  editWallet: "/wallets/edit",
  addGroups: "/groups/add",
  deleteGroup: "/groups/remove",
  editGroup: "/groups/edit",
  addGroupExpense: "/groupExpenses/add",
  editGroupExpense: "/groupExpenses/edit",
  deleteGroupExpense: "/groupExpenses/remove",
  billingGroupExpenses: "/billingGroupExpenses",
  addCategoryOfExpenses: "/categoriesOfExpenses/add",
  editCategoryOfExpenses: "/categoriesOfExpenses/edit",
  deleteCategoryOfExpenses: "/categoriesOfExpenses/remove",
  addCategoryOfIncomes: "/categoriesOfIncomes/add",
  editCategoryOfIncomes: "/categoriesOfIncomes/edit",
  deleteCategoryOfIncomes: "/categoriesOfIncomes/remove",
  addExpense: "/expenses/add",
  editExpense: "/expenses/edit",
  deleteExpense: "/expenses/remove",
  addIncome: "/incomes/add",
  editIncome: "/incomes/edit",
  deleteIncome: "/incomes/remove",
};
