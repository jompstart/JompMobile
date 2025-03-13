export interface ToastState {
  displayToast: boolean;
  toastMessage: string;
  message2?: string;
  toastType: 'success' | 'info';
}

export interface UIState {
  toast: ToastState;

  isCompliancePromptVisible: boolean;
}

export interface Toast {
  displayToast: boolean;
  toastMessage: string;
  toastType: 'success' | 'info' | 'error';
  position?: 'top' | 'bottom';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
}
