import React from "react";
import MaterialTable, { Column } from "material-table";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { tableLocalization } from "settings/tableLocalization";
import { User } from "interfaces/user";
import { checkIfUserExists } from "services/checkIfUserExists";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: "2rem",
      textAlign: "center",
      [theme.breakpoints.down("xs")]: {
        padding: "1rem",
      },
    },
  })
);

export interface UsersTabProps {
  users: Array<User>;
  addUser: (arg: User) => Promise<any>;
  deleteUser: (arg: User) => Promise<any>;
  title?: string;
}

export const UsersTab: React.SFC<UsersTabProps> = ({
  users,
  addUser,
  deleteUser,
  title,
}) => {
  const classes = useStyles();
  const columns: Array<Column<User>> = [
    { title: "Nazwa użytkownika", field: "username" },
  ];
  const onAdd = (newData: User) =>
    checkIfUserExists(newData.username)
      .then(() => addUser(newData))
      .catch(() => {});

  return (
    <div className={classes.container}>
      <MaterialTable
        title={title}
        columns={columns}
        data={users}
        localization={tableLocalization}
        options={{
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowAdd: (newData) => onAdd(newData),
          onRowDelete: (oldData) => deleteUser(oldData),
        }}
      />
    </div>
  );
};
