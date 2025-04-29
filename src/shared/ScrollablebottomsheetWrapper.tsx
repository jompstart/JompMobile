import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BackHandler, Dimensions, StyleSheet } from 'react-native';
import { sizes } from '../utils/size';
import { colors } from '../constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { height, width } = Dimensions.get('window');
const size = new sizes(height, width);

interface Props extends BottomSheetProps {
  visibility: boolean;
  onClose: () => void;
  hideHandle?: boolean;
  children: ReactNode;
  backdropOpacity?: number;
  handlerWidth?: number;
  onMount?: () => void;
  paddingHorizontal?: boolean;
  enableBackdrop?: boolean;
  isScrollable?: boolean;
  enablePanDownToClose?: boolean;
  backgroundColor?: string;
  topRadius?: number;
  disableBackdropPress?: boolean;
  snapPoints?: string[];
  isReady?: boolean;
}
const ScrollablebottomsheetWrapper = ({
  onClose,
  visibility,
  hideHandle,
  children,
  backdropOpacity,
  handlerWidth,
  onMount,
  enableBackdrop = false,
  paddingHorizontal = true,
  isScrollable = false,
  enablePanDownToClose = true,
  backgroundColor = colors.white(),
  topRadius = 32,
  disableBackdropPress = false,
  snapPoints,
  isReady = false,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const sheetSnapPoints = useMemo(
    () => (snapPoints ? snapPoints : ['60%', '85%', '100%']),
    []
  );

  // useEffect(() => {
  //   if (visibility) {
  //     bottomSheetRef.current?.snapToIndex(0); // Expands to the second snap point ('50%')
  //   } else {
  //     bottomSheetRef.current?.close();
  //   }
  // }, [visibility]);

  // useEffect(() => {
  //   onMount?.();
  //   const handleBackButton = () => {
  //     if (visibility === true) {
  //       onClose();
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  //   };
  // }, [visibility]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={disableBackdropPress ? 'none' : 'close'}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={backdropOpacity ? backdropOpacity : 0.8}
      />
    ),
    [disableBackdropPress, backdropOpacity]
  );

  return (
    <>
      {!visibility ? (
        <></>
      ) : (
        <BottomSheet
          onClose={() => {
            onClose();
          }}
          enableDynamicSizing={false}
          ref={bottomSheetRef}
          snapPoints={sheetSnapPoints}
          enablePanDownToClose={enablePanDownToClose}
          animateOnMount={true}
          backgroundStyle={{
            backgroundColor,
            borderTopRightRadius: size.getHeightSize(topRadius),
            borderTopLeftRadius: size.getHeightSize(topRadius),
          }}
          handleComponent={() => <></>}
          backdropComponent={enableBackdrop ? renderBackdrop : null}
        >
          {children}
        </BottomSheet>
      )}
    </>
  );
};

export default ScrollablebottomsheetWrapper;

const styles = StyleSheet.create({});
