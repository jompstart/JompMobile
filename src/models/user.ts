import { UserAccount } from '../enums/user.enums';

export interface UserModel {
  accountPreference: UserAccountPreference;
  complianceStatus: boolean;
  status: string;
  customerId: string;
  userId: string;
  email: string;
  fullName: string;
  ninStatus: string;
  bvnStatus: string;
}
export type UserAccountPreference = UserAccount;
