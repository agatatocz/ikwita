export const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
export const lowerCase = /^(?=.*[a-z])/;
export const upperCase = /^(?=.*[A-Z])/;
export const number = /^(?=.*[0-9])/;
export const specialChar = /^(?=.*[!@#$%^&*])/;
export const minimalLength = /(?=.{8,})/;
export const emailTemplate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
