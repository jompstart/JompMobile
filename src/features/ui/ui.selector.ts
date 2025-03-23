import { RootState } from '../../app/redux.store';
export const toastSelector = (state: RootState) => state.ui.toast;
export const complianceModalSelector = (state: RootState) =>
  state.ui.isCompliancePromptVisible;
export const successModalSelector = (state: RootState) => state.ui.successModal;
