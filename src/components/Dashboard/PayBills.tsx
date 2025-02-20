import { StyleSheet, View } from 'react-native';
import React from 'react';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import CancelIcon from '../../../assets/svgs/Home/CancelIcon';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import UserIcon from '../../../assets/svgs/Dashboard/UserIcon';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AddIcon from '../../../assets/svgs/Dashboard/AddIcon';
const PayBills = () => {
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
        Pay with Jomp
      </CText>
      <CText
        color={'secondaryBlack'}
        fontSize={16}
        lineHeight={22.4}
        fontFamily="regular"
      >
        View your account number and details
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
              backgroundColor: '#424E9B10',
            },
          ]}
        >
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#424E9B30',
              },
            ]}
          >
            <UserIcon
              width={size.getHeightSize(27)}
              height={size.getHeightSize(27)}
            />
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
              User Created
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Pay for services you have already received or not listed.
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
              backgroundColor: colors.white(),
            },
          ]}
        >
          <ProviderIcon size={size.getHeightSize(46)} />
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
              Providers Created
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Access endless services created just for you
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
              backgroundColor: '#FFF8ED',
            },
          ]}
        >
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#FFE69C',
              },
            ]}
          >
            <AddIcon size={size.getHeightSize(27)} />
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
              Jomp Curated
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

export default PayBills;

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
