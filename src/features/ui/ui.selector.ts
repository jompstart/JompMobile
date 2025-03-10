import { RootState } from '../../app/redux.store';
export const toastSelector = (state: RootState) => state.ui.toast;
