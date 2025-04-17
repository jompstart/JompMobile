import { StyleSheet, Pressable, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { colors } from '../../constants/colors';
const Faqs = () => {
  const [isFaqOpen, setFaqOpen] = useState<
    {
      isOpen: boolean;
      index: number | null;
    }[]
  >([
    {
      isOpen: false,
      index: null,
    },
  ]);
  const faqs = [
    {
      title: 'What is JompStart?',
      description:
        'JompStart is a digital marketplace that connects customers with loans for essential services. We offer easy loans to help our customers meet their immediate needs, such as school fees payment, rent payments, auto care, transportation credit, and hospital fees. Our customers can repay these loans conveniently with a repayment schedule in installments that varies based on the service provided. ',
    },
    {
      title: 'What types of services do you finance on JompStart?',
      description:
        'You can find various services, including education, housing and rent, transportation, healthcare, auto care, home maintenance, and other services essential to individuals and families.',
    },
    {
      title: 'How does the ‘pay later’ option work?',
      description:
        'The ‘pay later’ option allows customers to get services immediately while JompStart covers the cost. JompStart will pay the loan amount to your service provider/vendor. For instance, for school fees payment, we will pay the school fees to your school directly. The customer will pay back to JompStart in easy-to-manage installments.',
    },
    {
      title: 'How long do I have to repay a loan?',
      description:
        'We are geared toward making repayment convenient for our customers. The length of repayment is dependent on the type of service. School fees loans are to be repaid in 3 months, rent in 6 months, transportation in 1 month, auto care in 3 months, healthcare in 3 to 6 months, etc.',
    },
    {
      title: 'How do I sign up for JompStart?',
      description:
        'Visit the JompStart website (www.jompstart.com) and create an account. Follow the prompts to complete your registration.',
    },
    {
      title: 'Is JompStart available in my area?',
      description:
        'JompStart is rapidly expanding its service areas and is now available digitally in many States in Nigeria.',
    },
    {
      title: 'What are the most popular services on JompStart?',
      description:
        'JompStart is known for providing financing for services, including financing for school fees, rent payments, and transportation credits.',
    },
    {
      title: 'How do I pay for services on JompStart?',
      description:
        'Payments can be made using various methods, such as debit cards, bank transfers, and the option to pay later.',
    },
    {
      title:
        'What should I do if I encounter an issue with a service provider?',
      description:
        "If you experience any issues, do not hesitate to contact JompStart's customer support. The team is dedicated to helping you resolve any problems associated with the service provider.",
    },
    {
      title: 'Are there any fees for using JompStart?',
      description:
        'JompStart charges a small service fee for transactions. You will see all the charges during the payment process, there is no hidden charge. we are dedicated to transparency and will always disclose any fees in advance.',
    },
    {
      title: 'What is the interest rate for loans on JompStart?',
      description:
        'Interest rate for our loans is dependent on market realities. But our interest is one of the lowest in the market because of our goal to make life easier for our customers. In being true to our promise of making life easier, our interest is also on a reducing balance basis. This means the interest you pay every month is on the outstanding balance every month. You will see the actual interest when you apply for a loan on our platform.',
    },
    {
      title: 'How secure is my information on JompStart?',
      description:
        'JompStart employs robust security measures to safeguard your personal and financial information. All transactions are securely encrypted and processed.',
    },
    {
      title: 'Can I cancel a service after booking it?',
      description:
        'Cancellation policies differ depending on the service provider. You can check the cancellation policy before booking a service or contact customer support for more details.',
    },
    {
      title:
        'What documents and information are required to apply for a loan on JompStart?',
      description:
        'We request a few personal information to make us know more about you, such as your name, phone number, email address, your valid identification, etc. Depending on the service you want to request a loan for, we request the documents that pertain to that service. For instance, if you want to apply for a school fees loan, we request for the school fees invoice. For house rent, we may request for your tenancy agreement or offer letter, if any. Further, to be sure about your eligibility for our loan, we request your immediate past 6 months bank statement. You will see other things that we request in the loan application process.',
    },
    {
      title: 'How do I track my loan repayment progress?',
      description:
        'You can monitor your payments and view the remaining balance through your account on our online portal or by receiving regular email updates.',
    },
    {
      title: 'Can I pay off my loan early without incurring a penalty?',
      description:
        'There is no penalty associated with early repayment; however, we recommend verifying with us to confirm that your loan terms allow this option.',
    },
    {
      title: 'How do I contact customer support?',
      description:
        "You can contact us by phone, email, WhatsApp, or through our website's contact form. Our customer service team is available 24/7 to help you. How would you like to contact customer support?",
    },
  ];
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
      <View
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingTop: size.getHeightSize(16),
          flex: 1,
        }}
      >
        <CText
          color={'black'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="bold"
        >
          FAQS
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={18}
          lineHeight={28.8}
          fontFamily="regular"
        >
          These are frequently asked questions that users have asked in the past
          that may help you as well.
        </CText>
        <View
          style={{
            flex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              paddingBottom: size.getHeightSize(30),
            }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                gap: size.getHeightSize(16),
                marginTop: size.getHeightSize(18),
              }}
            >
              {faqs.map((faq, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setFaqOpen((prev) => {
                        let isOpened = prev.find((p) => p.index === index);
                        if (isOpened) {
                          let p = prev.filter((p) => p.index != index);
                          return p;
                        } else {
                          return [
                            ...prev,
                            {
                              index,
                              isOpen: true,
                            },
                          ];
                        }
                      });
                    }}
                    key={index}
                    style={{
                      backgroundColor: isFaqOpen.find(
                        (obj) => obj.index == index
                      )
                        ? colors.primary('15')
                        : colors.white(),
                      paddingVertical: size.getHeightSize(16),
                      paddingHorizontal: size.getWidthSize(16),
                      borderRadius: size.getHeightSize(4),
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: isFaqOpen.find(
                          (obj) => obj.index == index
                        )
                          ? size.getHeightSize(16)
                          : size.getHeightSize(0),
                      }}
                    >
                      <CText color="purple">{faq.title}</CText>
                      <AntDesign
                        name={
                          isFaqOpen.find((obj) => obj.index == index)
                            ? 'minus'
                            : 'plus'
                        }
                        color={colors.primary()}
                        size={size.getHeightSize(16)}
                      />
                    </View>
                    {isFaqOpen.find((obj) => obj.index == index) && (
                      <CText>{faq.description}</CText>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default Faqs;

const styles = StyleSheet.create({});
