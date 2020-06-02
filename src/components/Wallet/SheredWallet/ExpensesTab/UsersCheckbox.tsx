import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { User } from "interfaces/user";

export interface UsersCheckboxProps {
  checkMap: any;
  owner: User | undefined;
  expenseId: number;
  checkUserInGroupExpense: (
    expenseId: number,
    username: string
  ) => Promise<any>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  })
);

export const UsersCheckbox: React.SFC<UsersCheckboxProps> = ({
  checkMap,
  owner,
  expenseId,
  checkUserInGroupExpense,
}) => {
  const classes = useStyles();
  const [loadingMap, setLoadingMap] = React.useState<any>({});

  const setLoading = (username: string, loading: boolean) => {
    const loadingMapCopy = { ...loadingMap };
    loadingMapCopy[username] = loading;
    setLoadingMap(loadingMapCopy);
  };

  const handleChagne = (event: React.ChangeEvent<HTMLInputElement>) => {
    const username = event.target.name;
    setLoading(username, true);
    checkUserInGroupExpense(expenseId, username).finally(() => {
      setLoading(username, false);
    });
  };

  return (
    <FormGroup>
      {Object.keys(checkMap).map((username) => {
        const isOwner = owner && owner.username === username;
        const checked = checkMap[username];
        return (
          <div key={`${expenseId}${username}`} className={classes.flex}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={handleChagne}
                  name={username}
                  disabled={loadingMap[username]}
                />
              }
              label={isOwner ? `${username} (zgłaszający)` : username}
            />
            {loadingMap[username] && <CircularProgress size={15} />}
          </div>
        );
      })}
    </FormGroup>
  );
};
