import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import { useAppSelector, useAppDispatch } from '../controller/redux.controller';
import { updateTermsAndConditionVisibility } from '../features/ui/ui.slice';
import {
  payStackModalSelector,
  termsAndConditionSelector,
} from '../features/ui/ui.selector';

interface Props {
  onClose: () => void;

  reference?: string;
}
const PaystackView = ({ onClose }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const paystackModal = useAppSelector(payStackModalSelector);
  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={paystackModal.visible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
            {isLoading && (
              <View>
                <ActivityIndicator size="large" color={colors.primary()} />
              </View>
            )}

            <WebView
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{ uri: paystackModal.url }}
              style={styles.webview}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaystackView;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
  },
  openButton: {
    // paddingVertical: size.getHeightSize(12),
    paddingHorizontal: size.getWidthSize(24),
    backgroundColor: colors.primary(),
    borderRadius: size.getHeightSize(8),
  },
  openButtonText: {
    color: colors.white(),
    fontSize: size.getHeightSize(16),
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '95%',
    backgroundColor: colors.white(),
    borderTopLeftRadius: size.getHeightSize(16),
    borderTopRightRadius: size.getHeightSize(16),
    padding: size.getHeightSize(16),
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: size.getHeightSize(12),
  },
  closeButtonText: {
    color: colors.primary(),
    fontSize: size.fontSize(16),
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
});
