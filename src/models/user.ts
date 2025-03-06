export interface UserModel {
  accountPreference: UserAccountPreference;
}
export type UserAccountPreference = 'customer' | 'provider';
