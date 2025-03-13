import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from './ui.types';
const initialState: UIState = {
  toast: {
    displayToast: false,
    toastMessage: '',
    toastType: 'info',
  },
  isCompliancePromptVisible: false,
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
  },
});
export const { updateToast, resetToast, updateCompliancePromptVisibility } =
  uiSlice.actions;

export default uiSlice.reducer;
