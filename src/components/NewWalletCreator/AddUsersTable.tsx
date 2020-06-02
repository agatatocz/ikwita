import React from "react";
import MaterialTable, { Column } from "material-table";
import { tableLocalization } from "settings/tableLocalization";
import { checkIfUserExists } from "services/checkIfUserExists";

export interface NewUser {
  username: string;
  tableData?: { id: number };
}
export interface AddUsersTableProps {
  users: Array<NewUser>;
  setUsers: (users: Array<NewUser>) => void;
}

export const AddUsersTable: React.SFC<AddUsersTableProps> = ({
  users,
  setUsers,
}) => {
  const columns: Array<Column<NewUser>> = [
    { title: "Nazwa użytkownika", field: "username" },
  ];

  const addUser = (newData: NewUser) =>
    checkIfUserExists(newData.username)
      .then(() => {
        setUsers([...users, newData]);
      })
      .catch(() => {});

  const editUser = (newData: NewUser, oldData: any) =>
    checkIfUserExists(newData.username)
      .then(() => {
        const newUsers = [...users];
        //@ts-ignore
        newUsers.find(
          //@ts-ignore
          (user) => user.tableData.id === oldData.tableData.id
        ).username = newData.username;
        setUsers(newUsers);
      })
      .catch(() => {});

  const deleteUser = (oldData: any) => {
    return new Promise((resolve, reject) => {
      const newUsers = [...users].filter(
        //@ts-ignore
        (user) => user.tableData.id !== oldData.tableData.id
      );
      setUsers(newUsers);
      resolve();
    });
  };

  return (
    <MaterialTable
      title="Dodaj użytkowników"
      columns={columns}
      data={users}
      localization={tableLocalization}
      options={{
        actionsColumnIndex: -1,
      }}
      editable={{
        onRowAdd: (newData) => addUser(newData),
        onRowUpdate: (newData, oldData) => editUser(newData, oldData),
        onRowDelete: (oldData) => deleteUser(oldData),
      }}
    />
  );
};
