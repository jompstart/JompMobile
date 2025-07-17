import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from './CText';
interface Props {
  visible: boolean;
  url: string;
  onClose?: () => void;
  onAccept: () => void;
  agree: boolean;
}
const LoanAgreement = ({ visible, url, onClose, agree, onAccept }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        transparent
        visible={visible}
        animationType="slide"
        onRequestClose={() => onClose?.()}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Pressable style={styles.closeButton} onPress={() => onClose?.()}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
            {isLoading && (
              <View>
                <ActivityIndicator size="large" color={colors.primary()} />
              </View>
            )}

            <WebView
              onLoadStart={() => {
                setLoading(true);
                setHasLoaded(false);
              }}
              onLoadEnd={() => {
                setLoading(false);
                setHasLoaded(true);
              }}
              source={{ uri: url }}
              style={styles.webview}
            />
            {hasLoaded && (
              <Pressable
                onPress={() => onAccept()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: size.getWidthSize(16),
                  marginLeft: size.getWidthSize(16),
                  marginBottom: size.getHeightSize(32),
                  marginTop: size.getHeightSize(16),
                  alignSelf: 'center',
                }}
              >
                <Fontisto
                  color={colors.primary()}
                  size={size.getHeightSize(24)}
                  name={agree ? 'checkbox-active' : 'checkbox-passive'}
                />
                <CText color="primaryColor">I agree</CText>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoanAgreement;

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
    height: '90%',
    backgroundColor: colors.white(),
    borderTopLeftRadius: size.getHeightSize(16),
    borderTopRightRadius: size.getHeightSize(16),
    padding: size.getHeightSize(16),
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: colors.primary(),
    fontSize: size.getHeightSize(16),
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
});
