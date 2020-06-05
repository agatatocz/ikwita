import React, { createContext, useState, useEffect, useCallback } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import jwt_decode from "jwt-decode";
import { AppState } from "interfaces/appState";
import { User } from "interfaces/user";
import { Expense } from "interfaces/expense";
import { Income } from "interfaces/income";
import { Category } from "interfaces/category";
import { PrivateWallet } from "interfaces/privateWallet";
import { SheredWallet } from "interfaces/sheredWallet";
import { getToken, setToken, removeToken, DecodedJwt } from "services/auth";
import { services } from "services";
import {
  mapPrivateWallets,
  mapPrivateWallet,
  mapSheredWallets,
  mapSheredWallet,
  findExpense,
  indexOfSheredWallet,
  replaceCategoryWithNullCategory,
} from "./dataMappers";
import { routes } from "App";
import { toast } from "utils/toast";
import { filterById, indexOfById, findById } from "utils";

export const AppContext = createContext({});
export interface DataProviderProps extends RouteComponentProps {}

const RawDataProvider: React.SFC<DataProviderProps> = ({
  children,
  history,
}) => {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    wallets: [],
  });
  const [loading, setLoading] = useState<Boolean>(false);

  const setWallets = (wallets: Array<PrivateWallet | SheredWallet>) => {
    setAppState({
      ...appState,
      wallets,
    });
  };

  const setUsersData = useCallback(async () => {
    const token = getToken();
    if (!appState.user && token) {
      setLoading(true);
      const { username, email, userID }: DecodedJwt = jwt_decode(token);
      const { data: groups } = await services.getGroups(username);
      services
        .getWallets(username)
        .then(({ data }) => {
          setAppState({
            wallets: [...mapPrivateWallets(data), ...mapSheredWallets(groups)],
            user: {
              id: userID,
              username,
              email,
            },
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [appState]);

  useEffect(() => {
    setUsersData();
  }, [setUsersData]);

  const doLogIn = (username: string, password: string) =>
    services.login(username, password).then(async ({ data: token }) => {
      await setToken(token);
      await setUsersData();
      if (appState.wallets.length)
        history.push(`${routes.wallet}/${appState.wallets[0].id}`);
      else history.push(routes.newWallet);
    });

  const doLogOut = () => {
    removeToken();
    setAppState({
      user: null,
      wallets: [],
    });
    history.push(routes.empty);
  };

  const getWallet = (id: string) =>
    appState.wallets.find((wallet) => `${wallet.id}` === id);

  const addPrivateWallet = async (name: string) => {
    if (appState.user) {
      const { username } = appState.user;
      return services.addWallet(name, username).then(async ({ data }) => {
        const wallets = [...appState.wallets];
        const wallet = mapPrivateWallet(data);
        const index = indexOfSheredWallet(appState.wallets);
        wallets.splice(index, 0, wallet);
        setWallets(wallets);
        history.push(`${routes.wallet}/${data.w.id}`);
      });
    } else return Promise.reject();
  };
  const addSheredWallet = async (name: string, usersNames: string[]) => {
    if (appState.user) {
      const { username } = appState.user;
      return services
        .addGroup(name, username, usersNames)
        .then(async ({ data }) => {
          const response = await services.getGroups(username, data.id);
          const wallets = [
            ...appState.wallets,
            ...mapSheredWallets(response.data),
          ];
          setWallets(wallets);
          history.push(`${routes.wallet}/${data.id}`);
        });
    } else return Promise.reject();
  };

  const deleteWallet = async (walletId: string, isPrivate: boolean) => {
    setLoading(true);
    const apiCall = isPrivate ? services.deleteWallet : services.deleteGroup;
    return apiCall(walletId)
      .then(() => {
        const wallets = filterById([...appState.wallets], walletId);
        setWallets(wallets);
        if (wallets.length) history.push(`${routes.wallet}/${wallets[0].id}`);
        else history.push(`${routes.newWallet}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const editWallet = async (
    walletId: string,
    isPrivate: boolean,
    newName: string
  ) => {
    const apiCall = isPrivate ? services.editWallet : services.editGroup;
    return apiCall(walletId, newName).then(({ data }) => {
      const wallets = [...appState.wallets];
      const index = indexOfById(wallets, walletId);
      if (index >= 0) {
        wallets[index] = isPrivate
          ? mapPrivateWallet(data)
          : mapSheredWallet(data);
      }
      setWallets(wallets);
    });
  };

  const setWalletDataByDate = (walletId: string) => (
    dateFrom: string,
    dateTo: string
  ) => {
    const wallets = [...appState.wallets];
    const index = indexOfById(wallets, walletId);
    if (wallets[index] && appState.user) {
      const getData = wallets[index].isPrivate
        ? services.getWallets
        : services.getGroups;
      return getData(appState.user.username, walletId, dateFrom, dateTo).then(
        ({ data }) => {
          wallets[index] = wallets[index].isPrivate
            ? mapPrivateWallets(data)[0]
            : mapSheredWallets(data)[0];
          setWallets(wallets);
        }
      );
    }
    return Promise.reject();
  };

  const addCategory = (walletId: string, isIncome: boolean = false) => (
    category: Category
  ) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (category.name && appState.user && wallet) {
      if (wallet.isPrivate) {
        if (isIncome)
          return services
            .addCategoryOfIncome(category.name, appState.user.username)
            .then(({ data }) => {
              if ("incomesCategories" in wallet)
                wallet.incomesCategories.push(data);
              setWallets(wallets);
            });
        return services
          .addCategoryOfExpense(category.name, appState.user.username)
          .then(({ data }) => {
            if ("expensesCategories" in wallet)
              wallet.expensesCategories.push(data);
            setWallets(wallets);
          });
      } else if ("categories" in wallet)
        return services
          .addCategoryOfExpense(category.name, "", walletId)
          .then(({ data }) => {
            wallet.categories.push(data);
            setWallets(wallets);
          });
    }
    return Promise.reject();
  };
  const editCategory = (walletId: string, isIncome: boolean = false) => (
    category: Category
  ) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (category.name && appState.user && wallet) {
      if (wallet.isPrivate) {
        if (isIncome)
          return services
            .editCategoryOfIncome(
              category.id,
              category.name,
              appState.user.username
            )
            .then(({ data: { categoryOfIncomes: data } }) => {
              if ("incomesCategories" in wallet) {
                const cat = findById(wallet.incomesCategories, data.id);
                if (cat) {
                  cat.name = data.name;
                  wallet.incomes.forEach((income: Income) => {
                    if (`${income.category.id}` === `${data.id}`)
                      income.category.name = data.name;
                  });
                  setWallets(wallets);
                }
              }
            });
        return services
          .editCategoryOfExpense(
            category.id,
            category.name,
            appState.user.username
          )
          .then(({ data: { categoryOfExpenses: data } }) => {
            if ("expensesCategories" in wallet) {
              const cat = findById(wallet.expensesCategories, data.id);
              if (cat) {
                cat.name = data.name;
                wallet.expenses.forEach((expense: Income) => {
                  if (`${expense.category.id}` === `${data.id}`)
                    expense.category.name = data.name;
                });
                setWallets(wallets);
              }
            }
          });
      } else if ("categories" in wallet)
        return services
          .editCategoryOfExpense(category.id, category.name, "", walletId)
          .then(({ data: { categoryOfExpenses: data } }) => {
            const cat = findById(wallet.categories, data.id);
            if (cat) {
              cat.name = data.name;
              wallet.expenses.forEach((expense: Income) => {
                if (`${expense.category.id}` === `${data.id}`)
                  expense.category.name = data.name;
              });
              setWallets(wallets);
            }
          });
    }
    return Promise.reject();
  };
  const deleteCategory = (walletId: string, isIncome: boolean = false) => (
    category: Category
  ) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (wallet) {
      if (wallet.isPrivate) {
        if (isIncome)
          return services.deleteCategoryOfIncome(category.id).then(() => {
            if ("incomesCategories" in wallet) {
              wallet.incomesCategories = filterById(
                wallet.incomesCategories,
                category.id
              );
              wallet.incomes = replaceCategoryWithNullCategory(
                wallet.incomes,
                category.id
              );
              setWallets(wallets);
            }
          });
        return services.deleteCategoryOfExpense(category.id).then(() => {
          if ("expensesCategories" in wallet) {
            wallet.expensesCategories = filterById(
              wallet.expensesCategories,
              category.id
            );
            wallet.expenses = replaceCategoryWithNullCategory(
              wallet.expenses,
              category.id
            );
            setWallets(wallets);
          }
        });
      } else
        return services.deleteCategoryOfExpense(category.id).then(() => {
          if ("categories" in wallet) {
            wallet.categories = filterById(wallet.categories, category.id);
            wallet.expenses = replaceCategoryWithNullCategory(
              wallet.expenses,
              category.id
            );
            setWallets(wallets);
          }
        });
    }
    return Promise.reject();
  };

  const addExpense = (walletId: string) => (expenseData: Expense) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (wallet && appState.user) {
      const { name, value, date, category } = expenseData;
      if (wallet.isPrivate)
        return services
          .addExpense(name, value, date, category.id, walletId)
          .then(({ data }) => {
            wallet.expenses.push(data);
            wallet.sumExpenses += data.value;
            setWallets(wallets);
          });

      return services
        .addGroupExpense(
          name,
          value,
          date,
          category.id,
          appState.user.username,
          walletId
        )
        .then(({ data }) => {
          wallet.expenses.push(data);
          wallet.sumExpenses += data.value;
          setWallets(wallets);
        });
    }
    return Promise.reject();
  };
  const editExpense = (walletId: string) => (expenseData: Expense) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (wallet) {
      const { id, name, value, date, category } = expenseData;
      if (wallet.isPrivate)
        return services
          .editExpense(id, name, value, date, category.id, walletId)
          .then(({ data: { expense: data } }) => {
            const index = indexOfById(wallet.expenses, data.id);
            wallet.expenses[index] = data;
            setWallets(wallets);
          });

      return services
        .editGroupExpense(id, name, value, date, category.id)
        .then(({ data }) => {
          const index = indexOfById(wallet.expenses, data.id);
          wallet.expenses[index] = data;
          setWallets(wallets);
        });
    }
    return Promise.reject();
  };
  const deleteExpense = (walletId: string) => (expenseData: Expense) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (wallet) {
      const apiCall = wallet.isPrivate
        ? services.deleteExpense
        : services.deleteGroupExpense;
      return apiCall(expenseData.id).then(() => {
        wallet.expenses = filterById(wallet.expenses, expenseData.id);
        setWallets(wallets);
      });
    }
    return Promise.reject();
  };

  const addIncome = (walletId: string) => (incomeData: Income) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (wallet && "incomes" in wallet) {
      const { name, value, date, category } = incomeData;
      return services
        .addIncome(name, value, date, category.id, walletId)
        .then(({ data }) => {
          wallet.incomes.push(data);
          wallet.sumIncomes += data.value;
          setWallets(wallets);
        });
    }
    return Promise.reject();
  };
  const editIncome = (walletId: string) => (incomeData: Income) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (wallet && "incomes" in wallet) {
      const { id, name, value, date, category } = incomeData;
      return services
        .editIncome(id, name, value, date, category.id, walletId)
        .then(({ data: { income: data } }) => {
          const index = indexOfById(wallet.incomes, data.id);
          wallet.incomes[index] = data;
          setWallets(wallets);
        });
    }
    return Promise.reject();
  };
  const deleteIncome = (walletId: string) => (incomeData: Income) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    return services.deleteIncome(incomeData.id).then(() => {
      if (wallet && "incomes" in wallet) {
        wallet.incomes = filterById(wallet.incomes, incomeData.id);
        setWallets(wallets);
      }
    });
  };

  const addUser = (walletId: string) => (userData: User) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (wallet && "users" in wallet) {
      return services
        .addUsersToGroup(walletId, [userData.username])
        .then(() => {
          wallet.users.push(userData);
          setWallets(wallets);
        });
    } else return Promise.reject();
  };

  const deleteUser = (walletId: string) => (userData: User) => {
    const wallets = [...appState.wallets];
    const wallet = findById(wallets, walletId);
    if (wallet && "users" in wallet) {
      return services
        .deleteUsersFromGroup(walletId, [userData.username])
        .then(() => {
          wallet.users = filterById(wallet.users, userData.id);
          setWallets(wallets);
        });
    }
    return Promise.reject();
  };

  const checkUserInGroupExpense = (walletId: string) => (
    expenseId: number,
    username: string
  ) => {
    const wallets = [...appState.wallets];
    const expense = findExpense(wallets, walletId, expenseId);
    if (
      expense &&
      expense.users &&
      (expense.owner?.username === appState.user?.username ||
        username === appState.user?.username)
    ) {
      expense.users[username] = !expense.users[username];
      return services.checkUserInGroupExpense(expenseId, username).then(() => {
        setWallets(wallets);
      });
    } else {
      toast.error("Nie masz uprawnień do zmiany tego pola.");
      return Promise.reject();
    }
  };

  const context = {
    ...appState,
    loading,
    doLogIn,
    doLogOut,
    setUsersData,
    getWallet,
    addPrivateWallet,
    addSheredWallet,
    deleteWallet,
    editWallet,
    setWalletDataByDate,
    addCategory,
    editCategory,
    deleteCategory,
    addExpense,
    editExpense,
    deleteExpense,
    addIncome,
    editIncome,
    deleteIncome,
    addUser,
    deleteUser,
    checkUserInGroupExpense,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const DataProvider = withRouter(RawDataProvider);
