import { UserAccountPreference, UserModel } from '../../models/user';

export interface UserState extends UserModel {
  token: string;
}
