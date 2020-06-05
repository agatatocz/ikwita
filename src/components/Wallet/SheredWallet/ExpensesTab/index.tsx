import * as React from "react";
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Table, TableProps } from "./Table";
import { DatePicker, DatePickerProps } from "components/shered/DatePicker";
import { PieChart } from "components/shered/PieChart";
import { Categories, CategoriesProps } from "components/shered/Categories";
import { Footer, FooterProps } from "components/shered/Footer/";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "2rem",
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        padding: "1rem 0.5rem",
      },
    },
    sum: {
      margin: "0.5rem 0",
      width: "570px",
      [theme.breakpoints.down("xs")]: {
        width: "95vw",
      },
    },
    pieChartContainer: {
      height: "400px",
      width: "570px",
      [theme.breakpoints.down("xs")]: {
        height: "90vw",
        width: "95vw",
      },
    },
    flexSpace: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    flexCenter: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
  })
);

export interface ExpensesTabProps
  extends TableProps,
    DatePickerProps,
    CategoriesProps,
    FooterProps {
  sum: number;
}

export const ExpensesTab: React.SFC<ExpensesTabProps> = ({
  data,
  addExpense,
  editExpense,
  deleteExpense,
  categories,
  addCategory,
  editCategory,
  deleteCategory,
  sum,
  currency,
  dateFrom,
  dateTo,
  currentUser,
  checkUserInGroupExpense,
  onDatesSubmit,
  walletId,
  walletName,
  isPrivate,
}) => {
  const classes = useStyles();
  const dataForUser = data.filter(
    (item) => item.users && item.users[currentUser.username]
  );
  const sumForUser = dataForUser.length
    ? dataForUser
        .map((item) => (item.valuePerUser ? item.valuePerUser : 0))
        .reduce((prev, curr) => prev + curr)
    : 0;

  return (
    <div className={classes.container}>
      <div className={classes.flexSpace}>
        <DatePicker
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDatesSubmit={onDatesSubmit}
        />
        <Categories
          categories={categories}
          addCategory={addCategory}
          editCategory={editCategory}
          deleteCategory={deleteCategory}
        ></Categories>
      </div>

      {data && !!data.length && (
        <div className={classes.flexCenter}>
          <div>
            <Typography variant="h5" className={classes.sum}>
              Suma ogólna: {sum} {currency}
            </Typography>
            <div className={classes.pieChartContainer}>
              <PieChart data={data} />
            </div>
          </div>
          <div>
            <Typography variant="h5" className={classes.sum}>
              Suma Twoich wpłat: {sumForUser} {currency}
            </Typography>
            {!!sumForUser && (
              <div className={classes.pieChartContainer}>
                <PieChart data={dataForUser} isPerUser={true} />
              </div>
            )}
          </div>
        </div>
      )}
      <Table
        data={data}
        addExpense={addExpense}
        editExpense={editExpense}
        deleteExpense={deleteExpense}
        categories={categories}
        currency={currency}
        title="Historia wydatków"
        currentUser={currentUser}
        checkUserInGroupExpense={checkUserInGroupExpense}
      />
      <Footer
        walletId={walletId}
        walletName={walletName}
        isPrivate={isPrivate}
      />
    </div>
  );
};
