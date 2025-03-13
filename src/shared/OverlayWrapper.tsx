import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { toastSelector } from '../features/ui/ui.selector';
import { useAppSelector } from '../controller/redux.controller';
import CToast from './CToast';
const OverlayWrapper = () => {
  const toast = useAppSelector(toastSelector);
  return <>{toast.displayToast && <CToast />}</>;
};

export default OverlayWrapper;

const styles = StyleSheet.create({});
