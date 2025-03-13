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
