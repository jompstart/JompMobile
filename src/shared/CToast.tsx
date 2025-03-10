import { useEffect, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { LinearProgress } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import { colors } from '../constants/colors';
import { resetToast } from '../features/ui/ui.slice';
import { useAppDispatch, useAppSelector } from '../controller/redux.controller';
import { size } from '../config/size';
import InfoIcon from '../../assets/svgs/Transport/InfoIcon';
import { toastSelector } from '../features/ui/ui.selector';
const CToast = () => {
  const dispatch = useAppDispatch();
  const [progressValue, setProgressValue] = useState(0);
  const [animation] = useState(new Animated.Value(0));
  const toastProperty = useAppSelector(toastSelector);

  console.log(progressValue);
  useEffect(() => {
    if (toastProperty) {
      Toast.show({
        type: 'tomatoToast',
      });
    }
  }, [toastProperty]);
  const handleOnHide = () => {
    setProgressValue(0);
    dispatch(resetToast());
  };
  const onToastShow = () => {
    const animationDuration = 8000; // 8 seconds
    const animationSteps = 10; // You can adjust this based on the desired smoothness of the animation
    const stepDuration = animationDuration / animationSteps;
    const stepValue = 1 / animationSteps;
    let step = 0;
    const interval = setInterval(() => {
      setProgressValue((prevValue) => {
        const newValue = prevValue + stepValue;
        step++;
        if (step >= animationSteps) {
          // Reset progress value
          clearInterval(interval);
        }
        return Math.min(newValue, 1);
      });
    }, stepDuration);
  };
  const toastConfig = {
    tomatoToast: () => (
      <View style={styles.toastContainer}>
        <View
          style={[
            styles.toastRow,
            {
              marginVertical: size.getHeightSize(24),
              alignItems: 'center',
            },
          ]}
        >
          {toastProperty.toastType === 'success' ? (
            <AntDesign
              name="checkcircle"
              size={size.getHeightSize(18)}
              color={colors.primarySuccess()}
            />
          ) : toastProperty.toastType === 'info' ? (
            <AntDesign
              name="infocirlce"
              color={colors.primaryWarning()}
              size={size.getHeightSize(18)}
            />
          ) : (
            <AntDesign
              name="infocirlce"
              color={colors.primaryWarning()}
              size={size.getHeightSize(18)}
            />
          )}
          <Text style={styles.toastText}>{toastProperty.toastMessage}</Text>
        </View>
      </View>
    ),
  };
  return (
    <Toast
      config={toastConfig}
      onHide={handleOnHide}
      onShow={onToastShow}
      topOffset={size.getHeightSize(53)}
      position={'top'}
      bottomOffset={size.getHeightSize(60)}
    />
  );
};

export default CToast;
const styles = StyleSheet.create({
  toastText: {
    color: colors.white(),
    fontSize: size.fontSize(14),
    fontFamily: 'Outfit-Regular',
    lineHeight: size.getHeightSize(18),
  },
  toastContainer: {
    backgroundColor: colors.black(''),
    borderRadius: 4,
    width: size.getWidthSize(360),
    borderWidth: size.getWidthSize(1),
    borderColor: colors.primary(''),
  },
  toastRow: {
    flexDirection: 'row',
    marginHorizontal: size.getWidthSize(16),
    gap: size.getWidthSize(4),
    width: size.getWidthSize(286),
  },
});
