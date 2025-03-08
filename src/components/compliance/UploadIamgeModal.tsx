import { StyleSheet, View, Pressable, Alert } from 'react-native';
import React from 'react';
import CText from '../../shared/CText';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import BottomsheetWrapper from '../../shared/BottomsheetWrapper';
import SecondaryButton from '../../shared/SecondaryButton';
import {
  launchImageLibraryAsync,
  MediaType,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';
import { PermissionStatus } from 'expo-permissions';

interface Props {
  isVisible: boolean;
  onClose?: () => void;
  onSelectedImage?: (image: string) => void;
}
const UploadIamgeModal = ({ onClose, isVisible, onSelectedImage }: Props) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      console.log(permissionResponse);
      if (permissionResponse.granted === false) {
        Alert.alert(
          'Insufficient permission!',
          'You need to grant camera access to use this app'
        );
      }
      return permissionResponse.granted;
    }
    return true;
  }
  const pickImage = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets != null) {
      onSelectedImage?.(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    let result = await launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
    });

    if (result.assets != null) {
      onSelectedImage?.(result.assets[0].uri);
    }
  };
  return (
    <BottomsheetWrapper
      topRadius={16}
      enableBackdrop
      visibility={isVisible}
      onClose={() => onClose?.()}
    >
      <View
        style={{
          marginTop: size.getHeightSize(16),
          gap: size.getHeightSize(40),
        }}
      >
        <View
          style={{
            gap: size.getHeightSize(16),
          }}
        >
          <Pressable
            onPress={async () => {
              await takePhoto();
            }}
            style={styles.button}
          >
            <CText
              color={'#31005C' as any}
              fontSize={16}
              lineHeight={19.6}
              fontFamily="bold"
            >
              Take Photo with Camera
            </CText>
          </Pressable>
          <Pressable
            onPress={() => {
              pickImage();
            }}
            style={styles.button}
          >
            <CText
              color={'#31005C' as any}
              fontSize={16}
              lineHeight={19.6}
              fontFamily="bold"
            >
              Select from Device Photos
            </CText>
          </Pressable>
        </View>
        <SecondaryButton
          onPress={() => {
            onClose?.();
          }}
          label="Cancel"
        />
      </View>
    </BottomsheetWrapper>
  );
};

export default UploadIamgeModal;

const styles = StyleSheet.create({
  button: {
    borderRadius: size.getHeightSize(24),
    borderWidth: size.getHeightSize(1),
    borderColor: '#31005C4D',
    paddingVertical: size.getHeightSize(15.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
