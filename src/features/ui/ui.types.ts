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

export interface Toast {
  displayToast: boolean;
  toastMessage: string;
  toastType: 'success' | 'info' | 'error';
  position?: 'top' | 'bottom';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
}
