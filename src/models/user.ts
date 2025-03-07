import { UserAccount } from '../enums/user.enums';

export interface UserModel {
  accountPreference: UserAccountPreference;
  complianceStatus: boolean;
  status: string;
  customerId: string;
  userId: string;
}
export type UserAccountPreference = UserAccount;
