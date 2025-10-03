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
  phoneNumber: string;
  bvn?: string;
  niN?: string;
  balance: number;
  ledger: number;
  totalTransactions: number;
  totalOrders: number;
  bankDetails: BankDetails[];
  address: string | null;
  walletUniqueID: string | null; // Add this line
}

export interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
}
export type UserAccountPreference = UserAccount;
