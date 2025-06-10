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
} from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
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
}
const BottomsheetWrapper = ({
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
}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (visibility) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [visibility]);
  useEffect(() => {
    onMount?.();

    const handleBackButton = () => {
      if (visibility === true) {
        onClose();
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton
    );

    return () => {
      backHandler.remove(); // <- This is the correct modern way to remove the listener
    };
  }, [visibility]);

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
          keyboardBehavior={
            Platform.OS == 'ios' ? 'interactive' : 'interactive'
          }
          keyboardBlurBehavior="restore"
          onClose={() => {
            onClose();
          }}
          ref={bottomSheetRef}
          enableDynamicSizing
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
          {
            <BottomSheetView
              style={{
                paddingHorizontal: size.getWidthSize(16),

                paddingBottom: size.getHeightSize(40),
              }}
            >
              {children}
            </BottomSheetView>
          }
        </BottomSheet>
      )}
    </>
  );
};

export default BottomsheetWrapper;
const styles = StyleSheet.create({
  keyboardAwareContent: {
    flexGrow: 1,
  },
});
