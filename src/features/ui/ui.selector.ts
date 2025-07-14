import { RootState } from '../../app/redux.store';
export const toastSelector = (state: RootState) => state.ui.toast;
export const complianceModalSelector = (state: RootState) =>
  state.ui.isCompliancePromptVisible;
export const successModalSelector = (state: RootState) => state.ui.successModal;
export const accountDetailsBottomsheetSelector = (state: RootState) =>
  state.ui.accountDetailsBottomsheet;

export const logoutBottomsheetSelector = (state: RootState) =>
  state.ui.showLogoutBottomSheet;

export const termsAndConditionSelector = (state: RootState) =>
  state.ui.showTermsAndCondition;
export const payNowBottomsheetSelector = (state: RootState) =>
  state.ui.showPayNowBottomsheet;
export const payStackModalSelector = (state: RootState) =>
  state.ui.paystackModal;
