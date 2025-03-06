import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UIState} from './ui.types';
const initialState: UIState = {
  toast: {
    displayToast: false,
    toastMessage: '',
    toastType: 'info',
  },
  authBottomsheetComponent: {
    authBottomsheet: false,
    signupBottomsheet: false,
    registerBottomsheet: false,
    setUsernameBottomsheet: false,
    setTagsBottomsheet: false,
    connectWalletBottomsheet: false,
    loginBottomsheet: false,
    loginWithMailBottomsheet: false,
    forgotPasswordBottomsheet: false,
    setNewPasswordBottomsheet: false,
    passwordResetBottomsheet: false,
    passwordResetSuccess: false,
  },
  showAuthBottomsheet: false,
  showSignUpLoader: false,
  showPlayBar: false,
  showPlayingModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateToast(state, action: PayloadAction<UIState['toast']>) {
      state.toast = action.payload;
    },
    resetToast(state) {
      state.toast = initialState.toast;
    },
    updateAuthBottomSheet(
      state,
      action: PayloadAction<Partial<UIState['authBottomsheetComponent']>>,
    ) {
      state.authBottomsheetComponent = {
        ...state.authBottomsheetComponent,
        ...action.payload,
      };
    },
    updateAuthBottomsheetVisibility(state, action: PayloadAction<boolean>) {
      state.showAuthBottomsheet = action.payload;
    },
    updateAuthLoaderState: (state, action: PayloadAction<boolean>) => {
      state.showSignUpLoader = action.payload;
    },
    updatePlayBarVisibility: (state, action: PayloadAction<boolean>) => {
      state.showPlayBar = action.payload;
    },
    updatePlayingModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.showPlayingModal = action.payload;
    },
  },
});
export const {
  updateToast,
  resetToast,
  updateAuthBottomSheet,
  updateAuthBottomsheetVisibility,
  updateAuthLoaderState,
  updatePlayBarVisibility,
  updatePlayingModalVisibility,
} = uiSlice.actions;

export default uiSlice.reducer;
