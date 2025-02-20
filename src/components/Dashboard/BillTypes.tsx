import { StyleSheet, View } from 'react-native';
import React from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SchoolIcon from '../../../assets/svgs/Home/SchoolIcon';
import CarIcon from '../../../assets/svgs/Dashboard/CarIcon';
import HeartIcon from '../../../assets/svgs/Dashboard/HeartIcon';

const BillTypes = () => {
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      backgroundColor="#F9F8FF"
      visibility={false}
      onClose={() => {}}
    >
      <CancelIcon
        style={{
          alignSelf: 'flex-end',
          marginTop: size.getHeightSize(12),
        }}
        size={size.getHeightSize(24)}
      />
      <CText
        color={'secondaryBlack'}
        fontSize={18}
        lineHeight={28.8}
        fontFamily="bold"
      >
        Select Bill Type
      </CText>
      <CText
        color={'secondaryBlack'}
        fontSize={16}
        lineHeight={22.4}
        fontFamily="regular"
      >
        Pay for services you have already received or not listed
      </CText>
      <View
        style={{
          //   paddingHorizontal: size.getWidthSize(16),
          //   paddingVertical: size.getHeightSize(16),
          //   backgroundColor: colors.white(),
          //   borderRadius: size.getHeightSize(8),
          gap: size.getHeightSize(16),
          marginTop: size.getHeightSize(16),
          marginBottom: size.getHeightSize(32),
        }}
      >
        <View
          style={[
            styles.view,
            {
              backgroundColor: '#424E9B1A',
            },
          ]}
        >
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#424E9B4D',
              },
            ]}
          >
            <SchoolIcon size={size.getHeightSize(27)} />
          </View>
          <View
            style={{
              flex: 1,
              gap: size.getHeightSize(6),
            }}
          >
            <CText
              color={'black'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              School Fees
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Get access to school fees for you and your loved ones and pay at
              your convenience.
            </CText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={size.getHeightSize(20)}
            color={colors.primary()}
          />
        </View>
        <View
          style={[
            styles.view,
            {
              backgroundColor: '#1B741E26',
            },
          ]}
        >
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#1B741E4D',
              },
            ]}
          >
            <CarIcon size={size.getHeightSize(27)} />
          </View>
          <View
            style={{
              flex: 1,
              gap: size.getHeightSize(6),
            }}
          >
            <CText
              color={'black'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              Transport Credit
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Access transport services curated just for you with Pay Later with
              Jomp
            </CText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={size.getHeightSize(20)}
            color={colors.primary()}
          />
        </View>
        <View
          style={[
            styles.view,
            {
              backgroundColor: '#F8E7EC',
            },
          ]}
        >
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#F1B7B8',
              },
            ]}
          >
            <HeartIcon size={size.getHeightSize(27)} />
          </View>
          <View
            style={{
              flex: 1,
              gap: size.getHeightSize(6),
            }}
          >
            <CText
              color={'black'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="bold"
            >
              Health
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Coming soon.
            </CText>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={size.getHeightSize(20)}
            color={colors.primary()}
          />
        </View>
      </View>
    </BottomsheetWrapper>
  );
};

export default BillTypes;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(16),
  },
  view2: {
    backgroundColor: '#F0EDFF',
    paddingVertical: size.getHeightSize(9),
    paddingHorizontal: size.getHeightSize(9),
    borderRadius: '100%',
  },
});
