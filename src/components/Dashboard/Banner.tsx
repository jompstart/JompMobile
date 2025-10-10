import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import BillImage from '../../../assets/svgs/Home/BillImage';
interface Props {
  onPress?: () => void;
  title: string;
  description: string;
  step: string;
  buttonText: string;
}
const Banner = ({ description, step, buttonText, title, onPress }: Props) => {
  return (
    <Pressable
      onPress={() => {
        onPress && onPress();
      }}
      style={styles.cardView}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: size.getWidthSize(16),
          alignItems: 'center',
        }}
      >
        <CText
          color={'black'}
          fontSize={13}
          lineHeight={20.8}
          fontFamily="bold"
          style={{
            flex: 1,
          }}
        >
          {title}
        </CText>
        <CText
          color={'black'}
          fontSize={10}
          lineHeight={16}
          fontFamily="regular"
          style={{
            opacity: 0.7,
          }}
        >
          {step}
        </CText>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            gap: size.getHeightSize(8),
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <CText
            color={'black'}
            fontSize={11}
            lineHeight={17.6}
            fontFamily="semibold"
            style={{
              opacity: 0.7,
            }}
          >
            {description}
          </CText>
          <View style={styles.cardButton}>
            <CText
              color={'white'}
              fontSize={12}
              lineHeight={14.4}
              fontFamily="semibold"
              style={{
                letterSpacing: size.getWidthSize(0.2),
              }}
            >
              {buttonText}
            </CText>
          </View>
        </View>
        <BillImage
          width={size.getWidthSize(110)}
          height={size.getHeightSize(97)}
          style={{}}
        />
      </View>
    </Pressable>
  );
};

export default Banner;

const styles = StyleSheet.create({
  cardButton: {
    backgroundColor: colors.primary(),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(13.5),
    width: size.getWidthSize(125),
    borderRadius: size.getHeightSize(24),
  },
  cardView: {
    width: size.getWidthSize(310),
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),
    paddingVertical: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(8),
    justifyContent: 'space-between',
  },
});
