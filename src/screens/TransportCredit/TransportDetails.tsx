import { StyleSheet, Animated, Dimensions, FlatList, View } from 'react-native';
import React, { useRef, useState } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import PTextInput from '../../shared/PTextInput';
import PrimaryButton from '../../shared/PrimaryButton';
import PhoneInput from '../../shared/PhoneInput';
import Form1 from '../../components/Transport/Form1';
import Form2 from '../../components/Transport/Form2';
import Form3 from '../../components/SelfBills/Form3';
import Form4 from '../../components/SelfBills/Form4';
import { ScrollView } from 'react-native-gesture-handler';

const TransportDetails = () => {
  const { width, height } = Dimensions.get('window');
  let PADDING = size.getWidthSize(26);
  let newWidth = width - 2 * PADDING;
  const views = [
    {
      label: 'Transport Credit Request Details',
      title: 'Next: Employment/Occupation Details',
      component: <Form1 />,
    },
    {
      label: 'Employment/Occupation Details',
      title: 'Next: Required Uploads',
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
    <GradientSafeAreaView>
      <GradientHeader>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: size.getWidthSize(8),
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={size.getHeightSize(20)}
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
        </View>
      </GradientHeader>
      <View
        style={{
          flex: 1,
          paddingHorizontal: size.getWidthSize(16),
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingTop: size.getHeightSize(16),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: size.getWidthSize(16),
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
              style={
                {
                  // flex: 1,
                }
              }
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
        </ScrollView>
        <PrimaryButton
          style={{
            marginBottom: size.getHeightSize(32),
          }}
          label="Procced"
          onPress={handleNextView}
        />
      </View>
    </GradientSafeAreaView>
  );
};

export default TransportDetails;

const styles = StyleSheet.create({});
