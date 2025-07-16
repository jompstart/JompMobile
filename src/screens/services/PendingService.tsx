import {
  StyleSheet,
  RefreshControl,
  FlatList,
  Pressable,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { userSelector } from '../../features/user/user.selector';
import { useAppSelector } from '../../controller/redux.controller';
import { useGetPendingServices } from '../../hooks/api/providers';
import SecondaryButton from '../../shared/SecondaryButton';
import { useNavigation } from '@react-navigation/native';
const PendingService = () => {
  const user = useAppSelector(userSelector);
  const { navigate } = useNavigation();
  const { data, refetch } = useGetPendingServices(user.userId, user.customerId);
  console.log(data?.data);
  const [refreshing, setRefreshing] = useState(false);
  return (
    <GradientSafeAreaView>
      <GradientHeader>
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
      </GradientHeader>
      <View
        style={{
          paddingVertical: size.getHeightSize(16),
          paddingHorizontal: size.getWidthSize(16),
          flex: 1,
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
          Pending Service History
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: 0.75,
            marginBottom: size.getHeightSize(24),
          }}
        >
          View services awaiting your review
        </CText>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                refetch().finally(() => setRefreshing(false));
              }}
            />
          }
          data={data?.data}
          contentContainerStyle={{
            paddingBottom: size.getHeightSize(16),
            gap: size.getHeightSize(16),
          }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigate('AcceptPendingService', {
                  serviceId: item.id,
                  serviceType: item.name,
                });
              }}
              style={styles.view}
            >
              <View
                style={{
                  flex: 1,
                  gap: size.getHeightSize(8),
                }}
              >
                <View
                  style={{
                    gap: size.getHeightSize(4),
                  }}
                >
                  <CText
                    color={'black'}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily="bold"
                  >
                    Service Name
                  </CText>
                  <CText
                    color={'secondaryBlack'}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily="semibold"
                  >
                    {item.name}
                  </CText>
                </View>
                <View
                  style={{
                    gap: size.getHeightSize(4),
                  }}
                >
                  <CText
                    color={'black'}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily="bold"
                  >
                    Service Name
                  </CText>
                  <CText
                    color={'secondaryBlack'}
                    fontSize={15}
                    lineHeight={18}
                    fontFamily="semibold"
                  >
                    {item.description}
                  </CText>
                </View>
              </View>
              <SecondaryButton
                label="Review"
                style={{
                  paddingHorizontal: size.getWidthSize(16),
                  paddingVertical: size.getHeightSize(8),
                  borderWidth: 0,
                  marginTop: size.getHeightSize(12),
                }}
              />
            </Pressable>
          )}
        />
      </View>
    </GradientSafeAreaView>
  );
};

export default PendingService;

const styles = StyleSheet.create({
  view: {
    gap: size.getHeightSize(4),
    paddingVertical: size.getHeightSize(12),
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: colors.white(),
    borderRadius: size.getHeightSize(8),

    borderColor: colors.primary('90'),
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
