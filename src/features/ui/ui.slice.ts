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
  },
});
export const {
  updateToast,
  resetToast,
  updateCompliancePromptVisibility,
  updateSuccessModalVisibility,
  resetSuccessModal,
} = uiSlice.actions;

export default uiSlice.reducer;
