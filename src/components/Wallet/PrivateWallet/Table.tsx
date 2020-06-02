import React from "react";
import { DatePicker as MuiDatePicker } from "@material-ui/pickers";
import MaterialTable, { Column } from "material-table";
import { Expense } from "interfaces/expense";
import { Income } from "interfaces/income";
import { Category } from "interfaces/category";
import { tableLocalization } from "settings/tableLocalization";
import { toast } from "utils/toast";
import { dateToYYYYMMDD } from "utils";

export interface TableProps {
  data: Array<Expense> | Array<Income>;
  onAdd: (arg: Expense | Income) => Promise<any>;
  onEdit: (arg: Expense | Income) => Promise<any>;
  onDelete: (arg: Expense | Income) => Promise<any>;
  categories: Array<Category>;
  currency: string;
  title?: string;
}

export const Table: React.SFC<TableProps> = ({
  data,
  onAdd,
  onEdit,
  onDelete,
  categories,
  currency,
  title,
}) => {
  const getCategoriesLookup = () => {
    const lookup: any = {};
    categories.forEach((category) => {
      lookup[category.id] = category.name;
    });
    return lookup;
  };
  const columns: Array<Column<Expense | Income>> = [
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
    { title: "Nazwa", field: "name" },
    { title: `Wartość (${currency})`, field: "value" },
    {
      title: "Kategoria",
      field: "category.id",
      lookup: getCategoriesLookup(),
    },
  ];

  const validate = (data: Expense | Income) => {
    const { name, value, category } = data;
    if (name && value && category) return true;
    toast.error("Nazwa, wartość i kategoria są wymagane.");
    return false;
  };

  const handleAdd = (newData: Expense | Income) => {
    if (validate(newData)) {
      if (!newData.date) newData.date = dateToYYYYMMDD(new Date());
      return onAdd(newData);
    }
    return Promise.reject();
  };

  const handleEdit = (newData: Expense | Income) => {
    if (validate(newData)) return onEdit(newData);
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
        onRowAdd: (newData) => handleAdd(newData),
        onRowUpdate: (newData, oldData) => handleEdit(newData),
        onRowDelete: (oldData) => onDelete(oldData),
      }}
    />
  );
};
