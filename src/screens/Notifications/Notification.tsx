import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message'; // Optional: for toast notifications
import { NotificationScreenProps } from '../../types/navigations.types';
import GradientHeader from '../../shared/GradientHeader';
import GradientSafeAreaView from '../../shared/GradientSafeAreaView';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { size } from '../../config/size';
import CText from '../../shared/CText';
import { colors } from '../../constants/colors';
import { formatToAmount } from '../../utils/stringManipulation';
import { UserService } from '../../services/user';
import { NotificationDto, API_RESPONSE } from '../../services/dto/user.dto';
import { useAppSelector } from '../../controller/redux.controller';
import { userSelector } from '../../features/user/user.selector';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Interfaces for type safety
interface NotificationItemData {
  id: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  time: string;
  type: 'default' | 'success' | 'warning' | 'error' | 'info';
  hasRedDot: boolean;
  body?: string;
  serviceType?: string;
}

interface NotificationItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  time: string;
  type: 'default' | 'success' | 'warning' | 'error' | 'info';
  hasRedDot: boolean;
  onPress: () => void;
}

interface NotificationState {
  notifications: NotificationItemData[];
  selectedNotification: NotificationItemData | null;
  unreadCount: number;
  loading: boolean;
  error: string | null;
  deletingNotificationId: string | null;
}

// NotificationItem component
const NotificationItem: React.FC<NotificationItemProps> = ({
  icon,
  title,
  time,
  type = 'default',
  hasRedDot = false,
  onPress,
}) => {
  const getIconColor = (): string => {
    switch (type) {
      case 'success':
      case 'warning':
      case 'error':
      case 'info':
      case 'default':
        return '#FF9800';
    }
  };

  return (
    <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
      <View style={styles.notificationContent}>
        <View style={[styles.iconContainer, { backgroundColor: getIconColor() }]}>
          <MaterialIcons name={icon} size={18} color="white" />
        </View>
        <View style={styles.textContainer}>
          <CText fontSize={16} fontFamily="semibold" color="black" style={styles.notificationTitle} numberOfLines={1}>
            {title}
          </CText>
          <CText fontSize={12} color="#8E8E93" style={styles.notificationTime}>
            {time}
          </CText>
        </View>
        <View style={styles.rightSection}>
          {hasRedDot && <View style={styles.redDot} />}
          <TouchableOpacity style={styles.viewButton} onPress={onPress}>
            <CText fontSize={14} fontFamily="semibold" color="#FF9800" style={styles.viewText}>
              View
            </CText>
            <MaterialIcons name="chevron-right" size={16} color="#FF9800" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main Notification component
const Notification: React.FC<NotificationScreenProps> = ({ route: { params }, navigation }) => {
  const user = useAppSelector(userSelector);
  const [state, setState] = useState<NotificationState>({
    notifications: [],
    selectedNotification: null,
    unreadCount: 0,
    loading: true,
    error: null,
    deletingNotificationId: null,
  });

  const userService = new UserService(user.customerId ?? '', user.userId ?? '');

  // Fetch notifications and unread count
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user.userId || !user.customerId) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'User information not available',
        }));
        return;
      }

      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Fetch notifications
        const response = await userService.getUserNotifications();
         const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);
        console.log('Raw API Response for notifications:', JSON.stringify(response, null, 2));

        const notificationsData = (response as API_RESPONSE<NotificationDto[]>).data ?? response;
        if (Array.isArray(notificationsData)) {
          const mappedNotifications: NotificationItemData[] = notificationsData.map((notification: NotificationDto) => ({
            id: notification.id,
            icon: mapNotificationTypeToIcon(notification.serviceType ?? 'default'),
            title: notification.title,
            time: new Date(notification.createAt).toLocaleString(),
            type: mapServiceTypeToType(notification.serviceType ?? 'default'),
            hasRedDot: !notification.isRead,
            body: notification.body,
            serviceType: notification.serviceType,
          }));
          setState((prev) => ({ ...prev, notifications: mappedNotifications }));
        } else {
          console.warn('No valid notifications data:', notificationsData);
          setState((prev) => ({ ...prev, error: 'No notifications found' }));
        }

        // Fetch unread count
        const unreadResponse = await userService.getUnreadCount();
        console.log('Raw API Response for unread count:', JSON.stringify(unreadResponse, null, 2));

        const unreadCountData = (unreadResponse as API_RESPONSE<{ count: number }>).data ?? unreadResponse;
        if (typeof unreadCountData.count === 'number') {
          setState((prev) => ({ ...prev, unreadCount: unreadCountData.count }));
        } else {
          console.warn('No valid unread count data:', unreadCountData);
          setState((prev) => ({ ...prev, unreadCount: 0 }));
        }
      } catch (err: any) {
        console.error('Error fetching notifications:', err);
        setState((prev) => ({
          ...prev,
          error: err.message || 'Failed to load notifications',
        }));
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchNotifications();
  }, [user.userId, user.customerId]);

  // Map serviceType to icon
  const mapNotificationTypeToIcon = (serviceType: string): keyof typeof MaterialIcons.glyphMap => {
    switch (serviceType.toLowerCase()) {
      case 'texting app':
        return 'message';
      case 'savings':
        return 'savings';
      case 'transaction':
        return 'credit-card';
      default:
        return 'notifications';
    }
  };

  // Map serviceType to type
  const mapServiceTypeToType = (serviceType: string): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (serviceType.toLowerCase()) {
      case 'texting app':
        return 'info';
      case 'savings':
        return 'success';
      case 'transaction':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Handle notification press and mark as readfet
 const handleNotificationPress = async (notification: NotificationItemData) => {
  setState((prev) => ({ ...prev, selectedNotification: notification }));

  // Skip marking as read if the notification is already deleted
  if (!notification.hasRedDot || state.deletingNotificationId === notification.id) {
    return;
  }

  try {
    const response = await userService.markNotificationRead(notification.id);
    console.log('Mark read response:', JSON.stringify(response, null, 2));

    // Check for "message" instead of "status"
    const message = (response as API_RESPONSE<{ message: string }>).data?.message ?? response.message;
    if (message === 'Notification marked as read.') {
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.map((n) =>
          n.id === notification.id ? { ...n, hasRedDot: false } : n
        ),
        unreadCount: Math.max(prev.unreadCount - 1, 0),
      }));
    } else {
      console.warn('Unexpected response message:', message);
      setState((prev) => ({ ...prev, error: 'Failed to mark notification as read' }));
    }
  } catch (err: any) {
    console.error('Failed to mark notification as read:', err);
    // Ignore "Notification not found" errors after deletion
    if (err.message.includes('Notification not found')) {
      setState((prev) => ({
        ...prev,
        notifications: prev.notifications.filter((n) => n.id !== notification.id),
        unreadCount: Math.max(prev.unreadCount - 1, 0),
      }));
    } else {
      setState((prev) => ({ ...prev, error: 'Failed to mark notification as read' }));
    }
  }
};

  // Handle deleting a notification
 // Replace your handleDeleteNotification function with this:
const handleDeleteNotification = async (notificationId: string) => {
  const notificationToDelete = state.notifications.find((n) => n.id === notificationId);
  if (!notificationToDelete) {
    console.warn('Notification not found:', notificationId);
    return;
  }

  // Optimistically update the UI
  setState((prev) => ({
    ...prev,
    notifications: prev.notifications.filter((n) => n.id !== notificationId),
    selectedNotification: prev.selectedNotification?.id === notificationId ? null : prev.selectedNotification,
    deletingNotificationId: notificationId,
  }));

  try {
    const response = await userService.deleteNotification(notificationId);
    console.log('Delete notification response:', JSON.stringify(response, null, 2));

    // Check for "message" instead of "status"
    const message = (response as API_RESPONSE<{ message: string }>).data?.message ?? response.message;
    if (message === 'Notification deleted.' || response.status === 200 || response.statusCode === 200) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Notification deleted successfully',
      });
    } else {
      throw new Error(`Unexpected response from server: ${message}`);
    }
  } catch (err: any) {
    console.error('Failed to delete notification:', err);

    // Roll back the optimistic update
    setState((prev) => ({
      ...prev,
      notifications: [...prev.notifications, notificationToDelete].sort((a, b) => (b.time > a.time ? 1 : -1)),
      deletingNotificationId: null,
      error: null,
    }));

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err?.message || 'Failed to delete notification. Please try again.',
    });
  } finally {
    setState((prev) => ({ ...prev, deletingNotificationId: null }));
  }
};

// Replace your handleClearAllNotifications function with this:
const handleClearAllNotifications = async () => {
  const currentNotifications = state.notifications;
  const currentUnreadCount = state.unreadCount;

  // Optimistically clear notifications
  setState((prev) => ({
    ...prev,
    notifications: [],
    unreadCount: 0,
    selectedNotification: null,
    deletingNotificationId: 'all',
  }));

  try {
    const response = await userService.deleteAllNotifications();
    console.log('Clear all notifications response:', JSON.stringify(response, null, 2));

    // Check for "message" instead of "status"
    const message = (response as API_RESPONSE<{ message: string }>).data?.message ?? response.message;
    if (message === 'All user notifications deleted.' || response.status === 200 || response.statusCode === 200) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'All notifications cleared successfully',
      });
    } else {
      throw new Error(`Unexpected response from server: ${message}`);
    }
  } catch (err: any) {
    console.error('Failed to clear notifications:', err);

    // Roll back the optimistic update
    setState((prev) => ({
      ...prev,
      notifications: currentNotifications,
      unreadCount: currentUnreadCount,
      deletingNotificationId: null,
      error: null,
    }));

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err?.message || 'Failed to clear notifications. Please try again.',
    });
  } finally {
    setState((prev) => ({ ...prev, deletingNotificationId: null }));
  }
};

  const handleBackToNotifications = () => {
    setState((prev) => ({ ...prev, selectedNotification: null }));
  };

  return (
    <GradientSafeAreaView>
      <GradientHeader>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="chevron-left" size={24} color="white" />
            <CText color="white" fontSize={16} lineHeight={25.6} fontFamily="bold" style={styles.backText}>
              Go Back
            </CText>
          </TouchableOpacity>
          <CText color="white" fontSize={16} lineHeight={25.6} fontFamily="bold" style={styles.headerTitle}>
            Notification {state.unreadCount > 0 && `(${state.unreadCount})`}
          </CText>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <MaterialIcons name="search" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </GradientHeader>

      {state.error && (
        <View style={styles.errorContainer}>
          <CText fontSize={14} color="#F44336">
            {state.error}
          </CText>
        </View>
      )}

      {params && (
        <>
          <View style={{ marginTop: size.getHeightSize(16), paddingHorizontal: size.getWidthSize(16) }}>
            <CText fontSize={20} lineHeight={22.4} fontFamily="bold">
              Service Request
            </CText>
            <CText fontSize={18} style={{ marginTop: size.getHeightSize(8) }} lineHeight={22.4} fontFamily="semibold">
              View details of your service request below
            </CText>
          </View>
          <View
            style={{
              marginTop: size.getHeightSize(32),
              backgroundColor: colors.white('70'),
              paddingVertical: size.getHeightSize(16),
              marginHorizontal: size.getWidthSize(16),
              borderRadius: size.getWidthSize(8),
              gap: size.getHeightSize(16),
            }}
          >
            <View style={styles.view}>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="bold">
                Service Category:
              </CText>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="semibold">
                {params.ServiceCategory ?? 'N/A'}
              </CText>
            </View>
            <View style={styles.view}>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="bold">
                Customer request:
              </CText>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="semibold">
                {params.CustomerRequest ? `₦${formatToAmount(params.CustomerRequest)}` : 'N/A'}
              </CText>
            </View>
            <View style={styles.view}>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="bold">
                Approved amount:
              </CText>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="semibold">
                {params.ApprovedAmount ? `₦${formatToAmount(params.ApprovedAmount)}` : 'N/A'}
              </CText>
            </View>
            <View style={styles.view}>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="bold">
                Disbursed amount:
              </CText>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="semibold">
                {params.DisbursedAmount ? `₦${formatToAmount(params.DisbursedAmount)}` : 'N/A'}
              </CText>
            </View>
            <View style={styles.view}>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="bold">
                User contribution:
              </CText>
              <CText color="secondaryBlack" fontSize={18} lineHeight={22.4} fontFamily="semibold">
                {params.UserContribution ? `₦${formatToAmount(params.UserContribution)}` : 'N/A'}
              </CText>
            </View>
          </View>
        </>
      )}

{!params && !state.selectedNotification && (
  <View style={styles.content}>
    <View style={styles.titleSection}>
      <CText fontSize={20} lineHeight={22.4} fontFamily="bold">
        Notifications
      </CText>
      {state.loading && <CText fontSize={14} color="secondaryBlack">Loading...</CText>}
    </View>
    {state.notifications.length === 0 && !state.loading ? (
      <View style={styles.noNotificationsContainer}>
        <MaterialIcons name="notifications-none" size={64} color="#8E8E93" />
        <CText
          fontSize={16}
          fontFamily="semibold"
          color="#8E8E93"
          style={styles.noNotificationsText}
        >
          You have no recent notifications
        </CText>
      </View>
    ) : (
      <>
        <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
          {state.notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              icon={notification.icon}
              title={notification.title}
              time={notification.time}
              type={notification.type}
              hasRedDot={notification.hasRedDot}
              onPress={() => handleNotificationPress(notification)}
            />
          ))}
        </ScrollView>
        {state.notifications.length > 0 && (
          <TouchableOpacity
            style={styles.clearAllButton}
            onPress={handleClearAllNotifications}
            disabled={state.deletingNotificationId === 'all'}
          >
            <CText
              fontSize={16}
              fontFamily="semibold"
              color={state.deletingNotificationId === 'all' ? '#ccc' : '#F44336'}
            >
              {state.deletingNotificationId === 'all' ? 'Clearing...' : 'Clear All Notifications'}
            </CText>
          </TouchableOpacity>
        )}
      </>
    )}
  </View>
)}

      {!params && state.selectedNotification && (
        <View style={styles.content}>
          <View style={styles.detailHeader}>
            <TouchableOpacity style={styles.detailBackButton} onPress={handleBackToNotifications}>
              <MaterialIcons name="chevron-left" size={24} color="#333" />
              <CText fontSize={16} fontFamily="semibold" color="black">
                Notifications
              </CText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailBackButton}
              onPress={() => handleDeleteNotification(state.selectedNotification!.id)}
              disabled={state.deletingNotificationId === state.selectedNotification!.id}
            >
              <MaterialIcons
                name="delete"
                size={24}
                color={state.deletingNotificationId === state.selectedNotification!.id ? '#ccc' : '#F44336'}
              />
              <CText
                fontSize={16}
                fontFamily="semibold"
                color={state.deletingNotificationId === state.selectedNotification!.id ? '#ccc' : '#F44336'}
              >
                {state.deletingNotificationId === state.selectedNotification!.id ? 'Deleting...' : 'Delete'}
              </CText>
            </TouchableOpacity>
          </View>
          <View style={styles.detailContent}>
            <CText fontSize={16} color="secondaryBlack" fontFamily="semibold">
              {state.selectedNotification.title}
            </CText>
            <View style={styles.amountCard}>
              {state.selectedNotification.body && (
                <CText fontSize={16} color="secondaryBlack" style={styles.amount}>
                  {state.selectedNotification.body}
                </CText>
              )}
              <View style={styles.cardInfo}>
                {state.selectedNotification.serviceType && (
                  <View style={styles.cardRow}>
                    <CText fontSize={14} color="secondaryBlack">
                      Service Type:
                    </CText>
                    <CText fontSize={14} fontFamily="semibold" color="black">
                      {state.selectedNotification.serviceType}
                    </CText>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.additionalInfo}>
              <CText fontSize={16} fontFamily="semibold" color="black" style={styles.infoTitle}>
                Notification Details
              </CText>
              <CText fontSize={14} color="secondaryBlack" lineHeight={20}>
                {state.selectedNotification.body || state.selectedNotification.title}
              </CText>
            </View>
          </View>
        </View>
      )}
    </GradientSafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: size.getWidthSize(16),
    gap: size.getWidthSize(16),
    justifyContent: 'space-between',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backText: {
    marginLeft: size.getWidthSize(4),
  },
  headerTitle: {
    flex: 2,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerButton: {
    padding: size.getWidthSize(4),
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailContent: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(16),
    paddingTop: size.getHeightSize(24),
  },
  amountCard: {
    backgroundColor: colors.white('70'),
    borderRadius: size.getWidthSize(12),
    padding: size.getWidthSize(20),
    marginTop: size.getHeightSize(24),
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  amount: {
    textAlign: 'center',
    marginBottom: size.getHeightSize(16),
  },
  cardInfo: {
    gap: size.getHeightSize(12),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  additionalInfo: {
    marginTop: size.getHeightSize(32),
    padding: size.getWidthSize(16),
    backgroundColor: '#f8f9fa',
    borderRadius: size.getWidthSize(8),
  },
  infoTitle: {
    marginBottom: size.getHeightSize(8),
  },
  content: {
    flex: 1,
    marginTop: size.getHeightSize(16),
  },
  titleSection: {
    padding: size.getWidthSize(16),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationItem: {
    backgroundColor: 'white',
    marginHorizontal: size.getWidthSize(16),
    marginBottom: size.getHeightSize(12),
    borderRadius: size.getWidthSize(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
  },
  iconContainer: {
    width: size.getWidthSize(32),
    height: size.getWidthSize(32),
    borderRadius: size.getWidthSize(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: size.getWidthSize(12),
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationTitle: {
    lineHeight: 20,
    marginBottom: size.getHeightSize(2),
  },
  notificationTime: {
    lineHeight: 16,
  },
  rightSection: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  redDot: {
    width: size.getWidthSize(6),
    height: size.getWidthSize(6),
    borderRadius: size.getWidthSize(3),
    backgroundColor: '#FF3B30',
    position: 'absolute',
    top: -2,
    right: size.getWidthSize(4),
    zIndex: 1,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: size.getHeightSize(6),
    paddingHorizontal: size.getWidthSize(8),
  },
  viewText: {
    marginRight: size.getWidthSize(4),
  },
  notificationsList: {
    flex: 1,
    paddingTop: size.getHeightSize(8),
  },
  errorContainer: {
    padding: size.getWidthSize(16),
    backgroundColor: '#ffebee',
    marginHorizontal: size.getWidthSize(16),
    marginTop: size.getHeightSize(8),
    borderRadius: size.getWidthSize(8),
  },
  clearAllButton: {
    padding: size.getWidthSize(16),
    alignItems: 'center',
    marginVertical: size.getHeightSize(16),
  },
   noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: size.getHeightSize(32),
  },
  noNotificationsText: {
    marginTop: size.getHeightSize(16),
    textAlign: 'center',
  },

});

export default Notification;