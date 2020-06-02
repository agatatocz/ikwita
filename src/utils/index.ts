import { findIndex } from "lodash";

export const isString = (value: any) =>
  typeof value === "string" || value instanceof String;

export const dateToYYYYMMDD = (date: Date): string => {
  const day = date.getDate();
  let month: string | number = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const filterById = (array: Array<any>, id: string | number) =>
  array.filter((item) => `${item.id}` !== `${id}`);

export const indexOfById = (array: Array<any>, id: number | string) =>
  findIndex(array, (item: any) => `${item.id}` === `${id}`);

export const findById = (array: Array<any>, id: string | number) =>
  array.find((item) => `${item.id}` === `${id}`);
