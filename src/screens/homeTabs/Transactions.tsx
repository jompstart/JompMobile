import { StyleSheet, Text, ScrollView, View } from 'react-native';
import React from 'react';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import GradientHeader from '../../shared/GradientHeader';
import MenuIcon from '../../../assets/svgs/Home/MenuIcon';
import SearchIcon from '../../../assets/svgs/Home/SearchIcon';
import NotificationBell from '../../../assets/svgs/Home/NotificationBell';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import PersonIcon from '../../../assets/svgs/Services/PersonIcon';
import ProviderIcon from '../../../assets/svgs/Services/ProviderIcon';
import OrderBooks from '../../../assets/svgs/Services/OrderBooks';
import ArrowRightIcon from '../../../assets/svgs/Services/ArrowRightIcon';
import { colors } from '../../constants/colors';
import Transaction from '../../components/Transaction/Transaction';

const Transactions = () => {
  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <MenuIcon size={size.getHeightSize(28)} />
        <View style={{ flex: 1 }} />
        <SearchIcon size={size.getHeightSize(28)} />
        <NotificationBell size={size.getHeightSize(28)} />
      </GradientHeader>
      <ScrollView>
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
            Transactions
          </CText>
          <CText
            color={'secondaryBlack'}
            fontSize={16}
            lineHeight={22.4}
            fontFamily="regular"
            style={{
              opacity: 0.75,
              marginTop: size.getHeightSize(4),
              marginBottom: size.getHeightSize(24),
            }}
          >
            View all your transactions here
          </CText>
        </View>
        <View
          style={{
            gap: size.getHeightSize(16),
            paddingHorizontal: size.getWidthSize(16),
          }}
        >
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </View>
      </ScrollView>
    </GradientSafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({});
