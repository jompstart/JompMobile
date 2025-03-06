import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OnboardingCredentials } from './onboarding.types';
const initialState: OnboardingCredentials = {};

const onboardingSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
});
export const {} = onboardingSlice.actions;

export default onboardingSlice.reducer;
