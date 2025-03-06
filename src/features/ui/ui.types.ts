export interface ToastState {
  displayToast: boolean;
  toastMessage: string;
  message2?: string;
  toastType: 'success' | 'info';
}

export interface AuthBottomSheetState {
  authBottomsheet: boolean;
  signupBottomsheet: boolean;
  registerBottomsheet: boolean;
  setUsernameBottomsheet: boolean;
  setTagsBottomsheet: boolean;
  connectWalletBottomsheet: boolean;
  loginBottomsheet: boolean;
  loginWithMailBottomsheet: boolean;
  forgotPasswordBottomsheet: boolean;
  setNewPasswordBottomsheet: boolean;
  passwordResetBottomsheet: boolean;
  passwordResetSuccess: boolean;
}
export interface UIState {
  toast: ToastState;
  authBottomsheetComponent: AuthBottomSheetState;
  showAuthBottomsheet: boolean;
  showSignUpLoader: boolean;
  showPlayBar: boolean;
  showPlayingModal: boolean;
}
