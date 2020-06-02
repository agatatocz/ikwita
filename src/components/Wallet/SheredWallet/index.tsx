import React, { useContext } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { AppContext } from "components/Context/DataProvider";
import { SheredWallet as SheredWalletInterface } from "interfaces/sheredWallet";
import { ExpensesTab } from "./ExpensesTab";
import { UsersTab } from "./UsersTab";

export interface SheredWalletProps {
  wallet: SheredWalletInterface;
}

export const SheredWallet: React.SFC<SheredWalletProps> = ({ wallet }) => {
  const {
    user,
    addCategory,
    editCategory,
    deleteCategory,
    addExpense,
    editExpense,
    deleteExpense,
    addUser,
    deleteUser,
    checkUserInGroupExpense,
    setWalletDataByDate,
  } = useContext<any>(AppContext);
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newTabIndex: number) => {
    setTabIndex(newTabIndex);
  };
  return (
    <>
      <AppBar position="static" color="secondary">
        <Tabs
          value={tabIndex}
          indicatorColor="primary"
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab label="Wydatki" />
          <Tab label="Użytkownicy" />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && (
        <ExpensesTab
          data={wallet.expenses}
          addExpense={addExpense(wallet.id)}
          editExpense={editExpense(wallet.id)}
          deleteExpense={deleteExpense(wallet.id)}
          categories={wallet.categories}
          addCategory={addCategory(wallet.id)}
          editCategory={editCategory(wallet.id)}
          deleteCategory={deleteCategory(wallet.id)}
          sum={wallet.sumExpenses}
          currency={wallet.currency}
          dateFrom={wallet.dateFrom}
          dateTo={wallet.dateTo}
          currentUser={user}
          checkUserInGroupExpense={checkUserInGroupExpense(wallet.id)}
          onDatesSubmit={setWalletDataByDate(wallet.id)}
          walletId={wallet.id}
          walletName={wallet.name}
          isPrivate={wallet.isPrivate}
        />
      )}
      {tabIndex === 1 && (
        <UsersTab
          users={wallet.users}
          addUser={addUser(wallet.id)}
          deleteUser={deleteUser(wallet.id)}
          title=""
        />
      )}
    </>
  );
};
