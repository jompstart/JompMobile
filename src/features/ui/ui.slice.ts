import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from './ui.types';
const initialState: UIState = {
  toast: {
    displayToast: false,
    toastMessage: '',
    toastType: 'info',
  },
  isCompliancePromptVisible: false,
  successModal: {
    isVisble: false,
    title: '',
    description: '',
    callBack: () => {},
    buttonText: '',
  },

  accountDetailsBottomsheet: {
    isVisible: false,
  },
  showLogoutBottomSheet: false,
  showTermsAndCondition: false,
  showPayNowBottomsheet: {
    visible: false,
    amount: 0,
  },
  paystackModal: {
    url: '',
    visible: false,
  },
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
    updateCompliancePromptVisibility(state, action: PayloadAction<boolean>) {
      state.isCompliancePromptVisible = action.payload;
    },
    updateSuccessModalVisibility(
      state,
      action: PayloadAction<UIState['successModal']>
    ) {
      state.successModal = action.payload;
    },
    setSuccessModalCallback(state, action: PayloadAction<() => void>) {
      state.successModal.callBack = action.payload;
    },
    resetSuccessModal(state) {
      state.successModal = initialState.successModal;
    },
    updateAccountDetailsBottomsheetVisibility(
      state,
      action: PayloadAction<boolean>
    ) {
      state.accountDetailsBottomsheet.isVisible = action.payload;
    },
    updateLogoutBottomsheetVisibility(state, action: PayloadAction<boolean>) {
      state.showLogoutBottomSheet = action.payload;
    },
    updateTermsAndConditionVisibility(state, action: PayloadAction<boolean>) {
      state.showTermsAndCondition = action.payload;
    },
    updatePayNowBottomsheet(
      state,
      action: PayloadAction<UIState['showPayNowBottomsheet']>
    ) {
      state.showPayNowBottomsheet = action.payload;
    },
    updatePayStackModal(
      state,
      action: PayloadAction<UIState['paystackModal']>
    ) {
      state.paystackModal = action.payload;
    },
  },
});
export const {
  updateToast,
  resetToast,
  updateCompliancePromptVisibility,
  updateSuccessModalVisibility,
  resetSuccessModal,
  updateAccountDetailsBottomsheetVisibility,
  updateLogoutBottomsheetVisibility,
  updateTermsAndConditionVisibility,
  updatePayNowBottomsheet,
  updatePayStackModal,
} = uiSlice.actions;

export default uiSlice.reducer;
