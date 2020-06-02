import { http, endpoints } from "services/http";

export const getGroups = (
  userName: string,
  groupID?: string,
  dateFrom?: string,
  dateTo?: string
) =>
  http.get(endpoints.groupsGet, {
    params: {
      userName,
      groupID,
      dateFrom,
      dateTo,
    },
  });

export const addGroup = (
  name: string,
  ownerName: string,
  usersName: string[]
) =>
  http.post(endpoints.addGroups, {
    name,
    ownerName,
    usersName,
    currency: "PLN",
  });

export const addUsersToGroup = (groupId: string, usersName: string[]) =>
  http.post(`${endpoints.groupsAddUsers}?id=${groupId}`, {
    usersname: usersName,
  });

export const deleteUsersFromGroup = (groupId: string, usersName: string[]) =>
  http.put(`${endpoints.groupsDeleteUsers}?id=${groupId}`, {
    usersname: usersName,
  });

export const editGroup = (groupId: string, name: string) =>
  http.post(`${endpoints.editGroup}?id=${groupId}`, {
    name,
  });

export const deleteGroup = (id: string) =>
  http.get(endpoints.deleteGroup, {
    params: {
      id,
    },
  });
