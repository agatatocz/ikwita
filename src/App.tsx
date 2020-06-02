import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { theme } from "./settings/theme";
import { DataProvider } from "components/Context/DataProvider";
import { Header } from "components/shered/Header";
import { Menu } from "components/shered/Menu";
import { Wallet } from "components/Wallet";
import { NewWalletCreator } from "components/NewWalletCreator";
import { LoginForm } from "components/Login/LoginForm";
import { RegisterForm } from "components/Register/RegisterForm";
import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";
import plLocale from "date-fns/locale/pl";
import { ProtectedRoute } from "components/shered/ProtectedRoute";

class PlLocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date: Date) {
    return format(date, "d MMMM yyyy", { locale: plLocale });
  }
}

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={PlLocalizedUtils} locale={plLocale}>
          <CssBaseline />
          <DataProvider>
            <div className="App">
              <Header />
              <Switch>
                <ProtectedRoute
                  path={`${routes.wallet}/:id`}
                  render={(routeProps) => (
                    <>
                      <Menu {...routeProps} />
                      <Wallet {...routeProps} />
                    </>
                  )}
                />
                <ProtectedRoute
                  path={routes.newWallet}
                  render={(routeProps) => (
                    <>
                      <Menu {...routeProps} />
                      <NewWalletCreator {...routeProps} />
                    </>
                  )}
                />
                />
                <Route path={routes.login} component={LoginForm} />
                <Route path={routes.register} component={RegisterForm} />
                <ProtectedRoute path={routes.empty} component={() => <div />} />
              </Switch>
            </div>
          </DataProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

export const routes = {
  empty: "/",
  wallet: "/wallet",
  newWallet: "/new-wallet",
  login: "/signin",
  register: "/signup",
};
