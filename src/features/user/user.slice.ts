import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './user.types';
import { UserAccount } from '../../enums/user.enums';

const initialState: UserState = {
  token: '',
  complianceStatus: false,
  customerId: '',
  status: '',
  accountPreference: UserAccount.Provider,
  userId: '',
  email: '',
  fullName: '',
  bvnStatus: '',
  ninStatus: '',
  phoneNumber: '',
  bvn: '',
  niN: '',
  balance: 0.0,
  ledger: 0.0,
  totalTransactions: 0,
  totalOrders: 0,
  address: null,
  bankDetails: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserState: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    changeUserState: (
      state,
      action: PayloadAction<{
        key: keyof UserState;
        value: UserState[keyof UserState];
      }>
    ) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
  },
});

export const { updateUserState, changeUserState } = userSlice.actions;

export default userSlice.reducer;
