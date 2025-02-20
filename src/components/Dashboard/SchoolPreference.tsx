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
import ChildIcon from '../../../assets/svgs/Dashboard/ChildIcon';
import StudentIcon from '../../../assets/svgs/Dashboard/StudentIcon';

const SchoolPreference = () => {
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
        Select School Fees Preference
      </CText>
      <CText
        color={'secondaryBlack'}
        fontSize={16}
        lineHeight={22.4}
        fontFamily="regular"
      >
        Get access to school fees for you and your loved ones and pay at your
        convenience.
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
              backgroundColor: '#56BAEB26',
            },
          ]}
        >
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#56BAEB4D',
              },
            ]}
          >
            <ChildIcon size={size.getHeightSize(27)} />
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
              For My Child
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Apply for school fees loan for your child.
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
              backgroundColor: '#EFA00526',
            },
          ]}
        >
          <View
            style={[
              styles.view2,
              {
                backgroundColor: '#EFA0054D',
              },
            ]}
          >
            <StudentIcon size={size.getHeightSize(27)} />
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
              For Myself
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={13}
              lineHeight={18.2}
              fontFamily="regular"
            >
              Apply for school fees loan for yourself.
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

export default SchoolPreference;

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
