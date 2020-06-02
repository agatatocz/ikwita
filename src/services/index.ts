import { http } from "./http";
import { login } from "./login";
import { registerUser } from "./registerUser";
import { getWallets, addWallet, deleteWallet, editWallet } from "./wallets";
import {
  getGroups,
  addGroup,
  addUsersToGroup,
  deleteGroup,
  editGroup,
  deleteUsersFromGroup,
} from "./groups";
import { checkIfUserExists } from "./checkIfUserExists";
import {
  addGroupExpense,
  checkUserInGroupExpense,
  editGroupExpense,
  deleteGroupExpense,
} from "./groupExpenses";
import { addExpense, editExpense, deleteExpense } from "./expenses";
import { addIncome, editIncome, deleteIncome } from "./incomes";
import {
  addCategoryOfExpense,
  editCategoryOfExpense,
  deleteCategoryOfExpense,
  addCategoryOfIncome,
  editCategoryOfIncome,
  deleteCategoryOfIncome,
} from "./categories";

export const services = {
  http,
  login,
  registerUser,
  getWallets,
  getGroups,
  addWallet,
  deleteWallet,
  editWallet,
  addGroup,
  addUsersToGroup,
  deleteUsersFromGroup,
  deleteGroup,
  editGroup,
  checkIfUserExists,
  addGroupExpense,
  checkUserInGroupExpense,
  editGroupExpense,
  deleteGroupExpense,
  addCategoryOfExpense,
  editCategoryOfExpense,
  deleteCategoryOfExpense,
  addCategoryOfIncome,
  editCategoryOfIncome,
  deleteCategoryOfIncome,
  addExpense,
  editExpense,
  deleteExpense,
  addIncome,
  editIncome,
  deleteIncome,
};
