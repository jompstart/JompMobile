import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
import React, { useRef, useState, useContext } from 'react';
import { size } from '../../../config/size';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CText from '../../../shared/CText';
import { colors } from '../../../constants/colors';
import { CustomerServicesContext } from '../../../context/ServicesContext';
import PrimaryButton from '../../../shared/PrimaryButton';
import Form1 from '../../SelfBills/Form1';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Form2 from '../../SelfBills/Form2';
import Form3 from '../../SelfBills/Form3';
import Form4 from '../../SelfBills/Form4';
import { isAnyFieldEmpty } from '../../../utils/forms';
const SelfSchoolFeeForm = () => {
  const { width } = Dimensions.get('window');
  let PADDING = size.getWidthSize(26);
  let newWidth = width - 2 * PADDING;
  const views = [
    {
      label: 'Basic Information (Personal Details)',
      title: 'Next: Education Details ',
      component: <Form1 />,
    },
    {
      label: 'Education Details (Your Education Details)',
      title: 'Next: Employment/Business Details',
      component: <Form2 />,
    },
    {
      label: 'Employment/Business Details',
      title: 'Next: Document Uploads',
      component: <Form3 />,
    },
    {
      label: 'Document Uploads',
      title: '',
      component: <Form4 />,
    },
  ];
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);
  const [viewIndex, setViewIndex] = useState(0);
  const [progress, setProgress] = useState(25);
  const handleNextView = () => {
    if (viewIndex < views.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: viewIndex + 1,
        animated: true,
      });
      setViewIndex(viewIndex + 1);
      setProgress(progress + 100 / views.length);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: size.getWidthSize(16),
      }}
    >
      <KeyboardAwareScrollView
        extraScrollHeight={size.getHeightSize(16)}
        contentContainerStyle={{
          paddingTop: size.getHeightSize(16),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AnimatedCircularProgress
            fill={progress}
            size={size.getHeightSize(123)}
            width={size.getHeightSize(8)}
            tintColor="#4CAF50"
            backgroundColor={colors.primaryDisabled()}
            backgroundWidth={size.getHeightSize(8)}
            rotation={0}
            lineCap="round"
            style={{
              flex: 1,
            }}
          >
            {(fill) => (
              <CText
                color={'#31005C' as any}
                fontSize={23}
                lineHeight={36.8}
                fontFamily="bold"
              >
                {viewIndex + 1} of {views.length}
              </CText>
            )}
          </AnimatedCircularProgress>
          <View
            style={{
              flex: 1,
            }}
          >
            <CText
              color={colors.black('70') as any}
              fontSize={16}
              lineHeight={25.6}
              fontFamily="bold"
              style={{
                textAlign: 'right',
              }}
            >
              {views[viewIndex].label}
            </CText>
            <CText
              color={'secondaryBlack'}
              fontSize={16}
              lineHeight={22.4}
              fontFamily="regular"
              style={{
                textAlign: 'right',
              }}
            >
              {views[viewIndex].title}
            </CText>
          </View>
        </View>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            textAlign: 'left',
            marginTop: size.getHeightSize(24),
            marginBottom: size.getHeightSize(16),
          }}
        >
          Complete the fields below (
          <CText
            color={'warning'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
          >
            all are necessary to complete the process
          </CText>
          ).
        </CText>

        <View
          style={{
            width: width,
            alignItems: 'center',
            flex: 1,
          }}
        >
          <FlatList
            scrollEnabled={false}
            ref={flatListRef}
            data={views}
            horizontal
            pagingEnabled
            scrollEventThrottle={16}
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            // onViewableItemsChanged={onViewChangeRef.current}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            renderItem={({ item }: any) => {
              return (
                <View
                  style={{
                    width: width,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      width: size.getWidthSize(370),
                    }}
                  >
                    {item.component}
                  </View>
                </View>
              );
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      <PrimaryButton
        // disabled={
        //   viewIndex == 0 &&
        //   isAnyFieldEmpty(childSchoolFeeDetails.guardianDetails)
        // }
        style={{
          marginBottom: size.getHeightSize(32),
        }}
        label="Procced"
        onPress={handleNextView}
      />
    </View>
  );
};

export default SelfSchoolFeeForm;

const styles = StyleSheet.create({});
