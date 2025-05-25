import {
  StyleSheet,
  Pressable,
  RefreshControl,
  Image,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import CText from '../../shared/CText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import { useGetUserServices } from '../../hooks/api/providers';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import { FlatList } from 'react-native-gesture-handler';
import { formatToAmount } from '../../utils/stringManipulation';
const CreatedServices = () => {
  const user = useAppSelector(userSelector);
  const { navigate } = useNavigation();
  const { data: services, refetch } = useGetUserServices(
    user.userId,
    user.customerId
  );
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true); // Start the refreshing indicator
    try {
      await refetch(); // Trigger data refetch
    } catch (error) {
      console.error('Error refreshing services:', error);
    } finally {
      setRefreshing(false); // Stop the refreshing indicator
    }
  };

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
          style={{
            opacity: 0.75,
          }}
        >
          Service History
        </CText>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="regular"
          style={{
            opacity: 0.75,
            marginTop: size.getHeightSize(4),
          }}
        >
          View the services you have requested
        </CText>
        <View style={styles.view5}>
          {services?.data && (
            <FlatList
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: size.getHeightSize(16),
                marginTop: size.getHeightSize(24),
              }}
              keyExtractor={(item) => item.id}
              data={services.data}
              renderItem={({ item }) => (
                <View style={styles.view4}>
                  <View style={styles.view3}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{
                        uri: item.displayPicture,
                      }}
                    />
                  </View>
                  <CText
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                    style={{
                      marginTop: size.getHeightSize(12),
                    }}
                  >
                    {item.name}
                  </CText>
                  <CText
                    color={'secondaryBlack'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="regular"
                    style={{
                      marginTop: size.getHeightSize(4),
                    }}
                  >
                    {item.description}
                  </CText>
                  <CText
                    color={'black'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="bold"
                    style={{
                      marginTop: size.getHeightSize(4),
                    }}
                  >
                    ₦ {formatToAmount(item.price)}
                  </CText>
                  <CText
                    style={{
                      marginTop: size.getHeightSize(4),
                    }}
                    color={'primaryColor'}
                    fontSize={16}
                    lineHeight={22.4}
                    fontFamily="regular"
                  >
                    {item.status}
                  </CText>
                </View>
              )}
            />
          )}
        </View>
      </View>
    </GradientSafeAreaView>
  );
};

export default CreatedServices;

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(8),
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
    backgroundColor: '#424E9B10',
    borderRadius: size.getHeightSize(8),
  },
  text: {
    opacity: 0.75,
    marginTop: size.getHeightSize(4),
  },
  view2: {
    backgroundColor: '#F0EDFF',
    paddingVertical: size.getHeightSize(9),
    paddingHorizontal: size.getHeightSize(9),
    borderRadius: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: size.getHeightSize(16),
  },
  view3: {
    height: size.getHeightSize(100),
    width: size.getHeightSize(150),
    alignSelf: 'center',
  },
  view4: {
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
    borderRadius: size.getHeightSize(16),
    width: size.getWidthSize(175),
    height: size.getHeightSize(300),
    justifyContent: 'space-between',
  },
  view5: {
    flex: 1,
  },
});
