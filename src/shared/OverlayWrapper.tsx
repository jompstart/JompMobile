import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  accountDetailsBottomsheetSelector,
  payNowBottomsheetSelector,
  successModalSelector,
  toastSelector,
} from '../features/ui/ui.selector';
import { useAppSelector, useAppDispatch } from '../controller/redux.controller';
import SuccessModal from './SuccessModal';

import CToast from './CToast';
import { updateSuccessModalVisibility } from '../features/ui/ui.slice';

const OverlayWrapper = () => {
  const toast = useAppSelector(toastSelector);
  const successModal = useAppSelector(successModalSelector);
  // const showPayNowModal = useAppSelector(payNowBottomsheetSelector);
  const dispatch = useAppDispatch();
  return (
    <>
      {toast.displayToast && <CToast />}
      {successModal.isVisble && (
        <SuccessModal
          description={successModal.description}
          title={successModal.title}
          buttonText={successModal.buttonText}
          visibility={successModal.isVisble}
          onContinue={() => {
            successModal.callBack?.();
          }}
          onClose={() => {
            dispatch(
              updateSuccessModalVisibility({
                isVisble: false,
                title: '',
                description: '',
                buttonText: '',
                callBack: null,
              })
            );
          }}
        />
      )}
      
   
    </>
  );
};

export default OverlayWrapper;

const styles = StyleSheet.create({});
