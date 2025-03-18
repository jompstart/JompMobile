import { StyleSheet, Pressable, View, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from './CText';
import PdfIcon from '../../assets/svgs/shared/PdfIcon';
import * as DocumentPicker from 'expo-document-picker';
import AAttachmentIcon from '../../assets/svgs/Dashboard/AttachmentIcon';
import AttachmentRemoveIcon from '../../assets/svgs/shared/AttachmentRemoveIcon';
import {
  launchImageLibraryAsync,
  MediaType,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';
import { PermissionStatus } from 'expo-permissions';
interface Props {
  description: string;
  type: string;
  required?: boolean;
  onPress?: () => void;
  fileUri?: string;
  onFileSelected?: (file: string) => void;
  typeOfFileToPick?: 'pdf' | 'image' | null;
}
const AttachmentView = ({
  fileUri,
  description,
  type,
  required,
  onPress,
  onFileSelected,
  typeOfFileToPick,
}: Props) => {
  const [file, setFile] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'image' | null>(null);
  const [fileName, setFileName] = useState('');
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
      onFileSelected?.(result.assets[0].uri);
      setFile(result.assets[0].uri);
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
      onFileSelected?.(result.assets[0].uri);
      setFile(result.assets[0].uri);
    }
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf', // You can specify other types like 'application/*' for all documents
        copyToCacheDirectory: true,
      });

      if (result.assets != null) {
        setFile(result.assets[0].uri);
        onFileSelected?.(result.assets[0].uri);
        setFileType('pdf');
        setFileName(result.assets[0].name);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };
  return (
    <Pressable
      onPress={() => {
        typeOfFileToPick == 'image' ? takePhoto() : pickDocument();
      }}
      style={{
        paddingVertical: size.getHeightSize(14),
        backgroundColor: file ? colors.appBackground() : colors.white(),
        alignItems: 'center',

        borderRadius: size.getHeightSize(8),

        flexDirection: 'row',
        justifyContent: 'center',
        gap: size.getWidthSize(16),
      }}
    >
      {file ? (
        fileType == 'pdf' ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                gap: size.getWidthSize(4),
                flex: 1,
                backgroundColor: colors.white(),
                paddingVertical: size.getHeightSize(16),
                borderRadius: size.getHeightSize(8),
                paddingHorizontal: size.getWidthSize(16),
              }}
            >
              <PdfIcon size={size.getHeightSize(84)} />
              <CText
                color={'secondaryBlack'}
                fontSize={14}
                lineHeight={19.6}
                fontFamily="semibold"
                style={{
                  textAlign: 'center',
                  flex: 1,
                }}
              >
                {fileName}
              </CText>
            </View>
            <AttachmentRemoveIcon
              style={{
                alignSelf: 'center',
              }}
              width={size.getWidthSize(50)}
              height={size.getHeightSize(116)}
              onPress={() => {
                setFile('');
                onFileSelected?.('');
              }}
            />
          </>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.white(),
                paddingVertical: size.getHeightSize(16),
                borderRadius: size.getHeightSize(8),
                paddingHorizontal: size.getWidthSize(16),
              }}
            >
              <View
                style={{
                  width: size.getWidthSize(121),
                  height: size.getHeightSize(84),
                }}
              >
                <Image
                  source={{ uri: file }}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
            </View>
            <AttachmentRemoveIcon
              style={{
                alignSelf: 'center',
              }}
              width={size.getWidthSize(50)}
              height={size.getHeightSize(116)}
            />
          </>
        )
      ) : (
        <View
          style={{
            gap: size.getHeightSize(8),
          }}
        >
          <AAttachmentIcon
            style={{
              alignSelf: 'center',
            }}
            size={size.getHeightSize(40)}
          />
          <CText
            color={'secondaryBlack'}
            fontSize={14}
            lineHeight={19.6}
            fontFamily="semibold"
            style={{
              textAlign: 'center',
            }}
          >
            {description}
            <CText
              color={'primaryColor'}
              fontSize={14}
              lineHeight={19.6}
              fontFamily="bold"
            >
              Click to upload{' '}
              {required && (
                <CText
                  color={'warning'}
                  fontSize={18}
                  lineHeight={19.6}
                  fontFamily="bold"
                >
                  *
                </CText>
              )}
            </CText>
            {' \n'} {type}
          </CText>
        </View>
      )}
    </Pressable>
  );
};

export default AttachmentView;

const styles = StyleSheet.create({});
