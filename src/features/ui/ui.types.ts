import { RootStackParamList } from '../../types/navigations.types';

export interface ToastState {
  displayToast: boolean;
  toastMessage: string;
  message2?: string;
  toastType: 'success' | 'info';
}

export interface UIState {
  toast: ToastState;
  isCompliancePromptVisible: boolean;
  successModal: {
    isVisble: boolean;
    title: string;
    description: string;
    shouldNaviagtorTo?: RootStackParamList;
    pop?: number;
    callBack?: (() => void) | null;
    buttonText: string;
  };
  accountDetailsBottomsheet: {
    isVisible: boolean;
  };
  showLogoutBottomSheet: boolean;
  showTermsAndCondition: boolean;
}

export interface Toast {
  displayToast: boolean;
  toastMessage: string;
  toastType: 'success' | 'info' | 'error';
  position?: 'top' | 'bottom';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
}
