import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import StatesBottomsheet from '../../shared/StateBottomsheet';
const AcceptService = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [state, setState] = useState('');

  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MaterialIcons
          name="arrow-back-ios"
          size={size.getHeightSize(18)}
          color="white"
        />
        <CText
          color={'white'}
          fontSize={16}
          lineHeight={25.6}
          fontFamily="bold"
        >
          Go Back
        </CText>
      </GradientHeader>
      <KeyboardAwareScrollView>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
            paddingTop: size.getHeightSize(16),
          }}
        >
          <CText
            color={'black'}
            fontSize={18}
            lineHeight={28.8}
            fontFamily="bold"
            style={{
              opacity: 0.75,
            }}
          >
            Payment Completion
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
            style={{
              opacity: 0.75,
              marginTop: size.getHeightSize(4),
            }}
          >
            Complete payment
          </CText>
        </View>
        <View
          style={{
            paddingHorizontal: size.getWidthSize(16),
            marginTop: size.getHeightSize(24),
            gap: size.getHeightSize(16),
          }}
        >
          <PTextInput placeholder="Contact address" />
          <PTextInput
            placeholder="State"
            value={state}
            editable={false}
            onPress={() => {
              setIsVisible(true);
            }}
          />
          <PTextInput placeholder="Country" />
          <PrimaryButton
            label="Submit plan"
            style={{
              marginTop: size.getHeightSize(32),
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <StatesBottomsheet
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
        onStateSelected={(st) => {
          setState(st.name);
        }}
      />
    </GradientSafeAreaView>
  );
};

export default AcceptService;

const styles = StyleSheet.create({});
