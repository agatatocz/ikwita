import { User } from "./user";
import { PrivateWallet } from "./privateWallet";
import { SheredWallet } from "./sheredWallet";

export interface AppState {
  user: User | null;
  wallets: Array<PrivateWallet | SheredWallet>;
  // loading: boolean;
}
