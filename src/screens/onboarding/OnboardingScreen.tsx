import {
  StyleSheet,
  View,
  Animated,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants/images';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PrimaryButton from '../../shared/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
const OnboardingScreen = () => {
  const onboardingContent = [
    {
      backgroundImage: images.onboarding1,
      title: "Settle Your Child's School Fees",
    },
    {
      backgroundImage: images.onboarding2,
      title: 'Rent',
    },
    {
      backgroundImage: images.onboarding3,
      title: 'Transport Credit',
    },
    {
      backgroundImage: images.onboarding4,
      title: 'Fix Your Car Today, Pay Later with Jomp',
    },
    {
      backgroundImage: images.onboarding5,
      title: 'Stop Stressing About Hospital Bills. We Have Got You.',
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(onboardingContent[0]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(size.getWidthSize(11))).current;
  const navigation = useNavigation();
  useEffect(() => {
    // Fade in the image when the component mounts
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentSlide]);
  const changeSlide = (newSlide: {
    backgroundImage: string;
    title: string;
  }) => {
    // Fade out the image
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      // Change the slide and fade in the new image
      setCurrentSlide(newSlide);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };
  useEffect(() => {
    // Animate the width when the currentSlideIndex changes
    Animated.timing(widthAnim, {
      toValue:
        currentSlideIndex === currentSlideIndex
          ? size.getWidthSize(24)
          : size.getWidthSize(11),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentSlideIndex]);
  useEffect(() => {
    onboardingContent.forEach((slide) => {
      Image.prefetch(Image.resolveAssetSource(slide.backgroundImage).uri);
    });
  }, []);
  return (
    <ImageBackground
      source={{
        uri: Image.resolveAssetSource(currentSlide.backgroundImage).uri,
      }}
      resizeMode="cover"
      resizeMethod="resize"
      style={{
        flex: 1,
      }}
    >
      <StatusBar />
      <BottomsheetWrapper visibility={true} onClose={() => {}}>
        <CText
          color="black2"
          fontFamily="bold"
          style={{
            textAlign: 'center',
            paddingTop: size.getHeightSize(37),
          }}
        >
          {currentSlide.title}
        </CText>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            gap: size.getWidthSize(8),
            marginTop: size.getHeightSize(41),
          }}
        >
          {onboardingContent.map((slides, index) => (
            <View
              key={index}
              style={{
                height: size.getHeightSize(8),
                width:
                  currentSlideIndex === index
                    ? size.getWidthSize(24)
                    : size.getWidthSize(11),
                backgroundColor:
                  index == currentSlideIndex ? '#31005C' : colors.idle('40'),
                borderRadius:
                  index == currentSlideIndex
                    ? size.getWidthSize(43)
                    : size.getWidthSize(8),
              }}
            />
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: size.getHeightSize(19),
          }}
        >
          <PrimaryButton
            label="Skip"
            opacity="10"
            style={{
              paddingHorizontal: size.getWidthSize(17),
            }}
          />
          <PrimaryButton
            onPress={() => {
              if (currentSlideIndex < onboardingContent.length - 1) {
                changeSlide(onboardingContent[currentSlideIndex + 1]);
                setCurrentSlideIndex(currentSlideIndex + 1);
              } else {
                // Navigate to the next screen
                navigation.navigate('SignUp');
              }
            }}
            label="Next"
            style={{
              paddingHorizontal: size.getWidthSize(45),
            }}
          />
        </View>
      </BottomsheetWrapper>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
