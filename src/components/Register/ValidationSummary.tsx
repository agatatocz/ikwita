import * as React from "react";

export interface Error {
  message: string;
}

export const ValidationSummary: React.SFC<Error> = ({ message }) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};
