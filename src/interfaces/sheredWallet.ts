import { User } from "./user";
import { Wallet } from "./wallet";
import { Category } from "./category";

export interface SheredWallet extends Wallet {
  users: Array<User>;
  categories: Array<Category>;
}
