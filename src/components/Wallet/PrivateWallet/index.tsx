import React, { useContext } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { AppContext } from "components/Context/DataProvider";
import { PrivateWallet as PrivateWalletInterface } from "interfaces/privateWallet";
import { PrivateWalletDumb } from "./PrivateWalletDumb";

export interface PrivateWalletProps {
  wallet: PrivateWalletInterface;
}

export const PrivateWallet: React.SFC<PrivateWalletProps> = ({ wallet }) => {
  const {
    addCategory,
    editCategory,
    deleteCategory,
    addExpense,
    editExpense,
    deleteExpense,
    addIncome,
    editIncome,
    deleteIncome,
    setWalletDataByDate,
  } = useContext<any>(AppContext);
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleTabChange = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };
  return (
    <>
      <AppBar position="static" color="secondary">
        <Tabs
          value={tabIndex}
          indicatorColor="primary"
          variant="fullWidth"
          onChange={handleTabChange}
        >
          <Tab label="Wydatki" />
          <Tab label="Przychody" />
        </Tabs>
      </AppBar>
      {tabIndex === 0 && (
        <PrivateWalletDumb
          data={wallet.expenses}
          onAdd={addExpense(wallet.id)}
          onEdit={editExpense(wallet.id)}
          onDelete={deleteExpense(wallet.id)}
          categories={wallet.expensesCategories}
          addCategory={addCategory(wallet.id)}
          editCategory={editCategory(wallet.id)}
          deleteCategory={deleteCategory(wallet.id)}
          sum={wallet.sumExpenses}
          currency={wallet.currency}
          isExpenses={true}
          dateFrom={wallet.dateFrom}
          dateTo={wallet.dateTo}
          onDatesSubmit={setWalletDataByDate(wallet.id)}
          walletId={wallet.id}
          walletName={wallet.name}
          isPrivate={wallet.isPrivate}
        />
      )}
      {tabIndex === 1 && (
        <PrivateWalletDumb
          data={wallet.incomes}
          onAdd={addIncome(wallet.id)}
          onEdit={editIncome(wallet.id)}
          onDelete={deleteIncome(wallet.id)}
          categories={wallet.incomesCategories}
          addCategory={addCategory(wallet.id, true)}
          editCategory={editCategory(wallet.id, true)}
          deleteCategory={deleteCategory(wallet.id, true)}
          sum={wallet.sumIncomes}
          currency={wallet.currency}
          isExpenses={false}
          dateFrom={wallet.dateFrom}
          dateTo={wallet.dateTo}
          onDatesSubmit={setWalletDataByDate(wallet.id)}
          walletId={wallet.id}
          walletName={wallet.name}
          isPrivate={wallet.isPrivate}
        />
      )}
    </>
  );
};
