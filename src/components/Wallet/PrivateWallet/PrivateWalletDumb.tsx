import React from "react";
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
      margin: "1rem 0",
    },
    pieChartContainer: {
      height: "400px",
      [theme.breakpoints.down("xs")]: {
        height: "90vw",
      },
    },
    flex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
  })
);

export interface PrivateWalletDumbProps
  extends TableProps,
    DatePickerProps,
    CategoriesProps,
    FooterProps {
  sum: number;
  isExpenses: boolean;
}

export const PrivateWalletDumb: React.SFC<PrivateWalletDumbProps> = ({
  data = [],
  onAdd,
  onEdit,
  onDelete,
  categories = [],
  sum,
  currency,
  isExpenses,
  dateFrom,
  dateTo,
  addCategory,
  editCategory,
  deleteCategory,
  onDatesSubmit,
  walletId,
  walletName,
  isPrivate,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
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
      <Typography variant="h5" className={classes.sum}>
        Suma: {sum} {currency}
      </Typography>
      {data && !!data.length && (
        <div className={classes.pieChartContainer}>
          <PieChart data={data} />
        </div>
      )}
      <Table
        data={data}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        categories={categories}
        currency={currency}
        title={isExpenses ? "Historia wydatków" : "Historia przychodów"}
      />
      <Footer
        walletId={walletId}
        walletName={walletName}
        isPrivate={isPrivate}
      />
    </div>
  );
};
