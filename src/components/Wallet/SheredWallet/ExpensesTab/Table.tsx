import React from "react";
import MaterialTable, { Column } from "material-table";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";

import { tableLocalization } from "settings/tableLocalization";
import { Expense } from "interfaces/expense";
import { Category } from "interfaces/category";
import { User } from "interfaces/user";
import { UsersCheckbox } from "./UsersCheckbox";
import { toast } from "utils/toast";
import { dateToYYYYMMDD } from "utils";
import { round } from "lodash";

export interface TableProps {
  data: Array<Expense>;
  addExpense: (arg: Expense) => Promise<any>;
  editExpense: (arg: Expense) => Promise<any>;
  deleteExpense: (arg: Expense) => Promise<any>;
  checkUserInGroupExpense: (
    expenseId: number,
    username: string
  ) => Promise<any>;
  categories: Array<Category>;
  currency: string;
  title?: string;
  currentUser: User;
}

export const Table: React.SFC<TableProps> = ({
  data,
  addExpense,
  editExpense,
  deleteExpense,
  categories,
  currency,
  title,
  currentUser,
  checkUserInGroupExpense,
}) => {
  const getCategoriesLookup = () => {
    const lookup: any = {};
    categories.forEach((category) => {
      lookup[category.id] = category.name;
    });
    return lookup;
  };
  const columns: Array<Column<Expense>> = [
    {
      title: "Data",
      field: "date",
      editComponent: (props) => (
        <MuiDatePicker
          variant="inline"
          format="dd/MM/yyyy"
          value={props.value}
          onChange={props.onChange}
        />
      ),
      defaultSort: "desc",
    },
    {
      title: "Nazwa",
      field: "name",
    },
    { title: `Wartość (${currency})`, field: "value" },
    {
      title: `Wartość na osobę (${currency})`,
      field: "valuePerUser",
      editable: "never",
    },
    {
      title: "Kategoria",
      field: "category.id",
      lookup: getCategoriesLookup(),
    },
    {
      title: "Rozliczenie",
      field: "users",
      render: (rowData) =>
        rowData ? (
          <UsersCheckbox
            checkMap={rowData.users}
            owner={rowData.owner}
            expenseId={rowData.id}
            checkUserInGroupExpense={checkUserInGroupExpense}
          />
        ) : null,
      editable: "never",
      customSort: (a, b) => {
        if (a.users && b.users) {
          const valueA = Object.values(a.users).filter((item) => item).length;
          const valueB = Object.values(b.users).filter((item) => item).length;
          return valueA - valueB;
        }
        return 0;
      },
    },
  ];

  const validate = (data: Expense) => {
    const { name, value, category } = data;
    if (name && value && category) return true;
    toast.error("Nazwa, wartość i kategoria są wymagane.");
    return false;
  };

  const onAdd = (newData: Expense) => {
    if (validate(newData)) {
      if (!newData.date) newData.date = dateToYYYYMMDD(new Date());
      newData.value = round(newData.value, 2);
      return addExpense(newData);
    }
    return Promise.reject();
  };

  const onEdit = (newData: Expense) => {
    if (validate(newData)) return editExpense(newData);
    return Promise.reject();
  };

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      localization={tableLocalization}
      options={{
        actionsColumnIndex: -1,
      }}
      editable={{
        isEditable: (rowData) =>
          rowData.owner?.username === currentUser.username,
        isDeletable: (rowData) =>
          rowData.owner?.username === currentUser.username,
        onRowAdd: (newData) => onAdd(newData),
        onRowUpdate: (newData, oldData) => onEdit(newData),
        onRowDelete: (oldData) => deleteExpense(oldData),
      }}
    />
  );
};
