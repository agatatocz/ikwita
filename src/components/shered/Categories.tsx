import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Dialog } from "@material-ui/core";
import MaterialTable, { Column } from "material-table";
import { tableLocalization } from "settings/tableLocalization";
import { Category } from "interfaces/category";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: "530px",
      [theme.breakpoints.down("xs")]: {
        minWidth: "95%",
      },
    },
  })
);

export interface CategoriesProps {
  categories: Array<Category>;
  addCategory: (category: Category) => Promise<any>;
  editCategory: (category: Category, oldData: any) => Promise<any>;
  deleteCategory: (category: Category) => Promise<any>;
}

export const Categories: React.SFC<CategoriesProps> = ({
  categories,
  addCategory,
  editCategory,
  deleteCategory,
}) => {
  const classes = useStyles();
  const [openCategories, setOpenCategories] = useState(false);
  const columns: Array<Column<Category>> = [{ title: "Nazwa", field: "name" }];

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  return (
    <>
      <Button variant="outlined" color="secondary" onClick={toggleCategories}>
        Kategorie
      </Button>
      <Dialog onClose={toggleCategories} open={openCategories}>
        <div className={classes.table}>
          <MaterialTable
            title="Kategorie"
            columns={columns}
            data={categories}
            localization={tableLocalization}
            options={{
              actionsColumnIndex: -1,
            }}
            editable={{
              onRowAdd: (newData) => addCategory(newData),
              onRowUpdate: (newData, oldData) => editCategory(newData, oldData),
              onRowDelete: (oldData) => deleteCategory(oldData),
            }}
          />
        </div>
      </Dialog>
    </>
  );
};
