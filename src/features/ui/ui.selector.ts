import {RootState} from '../../app/redux.store';
export const selectToast = (state: RootState) => state.ui.toast;
export const authBottomsheetVisibilitySelector = (state: RootState) =>
  state.ui.showAuthBottomsheet;
export const authSheetComponentSelector = (state: RootState) =>
  state.ui.authBottomsheetComponent;
export const showSignUpLoaderSelector = (state: RootState) =>
  state.ui.showSignUpLoader;
export const showPlayBarSelector = (state: RootState) => state.ui.showPlayBar;
export const showPlayingModalSelector = (state: RootState) =>
  state.ui.showPlayingModal;
