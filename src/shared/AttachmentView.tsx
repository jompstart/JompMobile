import { StyleSheet, Pressable, View, Alert, Image, Modal } from 'react-native';
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
  PermissionStatus,
} from 'expo-image-picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { MediaFile } from '../interface/provider';
interface Props {
  description: string;
  type: string;
  required?: boolean;
  onPress?: () => void;
  fileUri?: string;
  onFileSelected?: (file: MediaFile) => void;
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
  const [showModal, setShowModal] = useState(false);

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
      let uri = result.assets[0].uri;
      uri = uri.startsWith('file://') ? uri : 'file://' + uri;

      onFileSelected?.({
        name: result.assets[0].fileName!,
        uri: uri,
        type: result.assets[0].mimeType!,
      });
      setFile(uri);
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
      let uri = result.assets[0].uri;
      uri = uri.startsWith('file://') ? uri : 'file://' + uri;

      onFileSelected?.({
        name: result.assets[0].fileName!,
        uri: uri,
        type: result.assets[0].mimeType!,
      });
      setFile(uri);
    }
  };

  const createFile = async (uri: string, name: string, type: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new File([blob], name, { type });
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.assets != null) {
        let uri = result.assets[0].uri;
        uri = uri.startsWith('file://') ? uri : 'file://' + uri;

        onFileSelected?.({
          name: result.assets[0].name!,
          uri: uri,
          type: result.assets[0].mimeType!,
        });
        setFile(uri);
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
        typeOfFileToPick == 'pdf' ? pickDocument() : setShowModal(true);
      }}
      style={{
        paddingVertical: size.getHeightSize(14),
        backgroundColor: file ? colors.appBackground() : colors.white(),
        alignItems: 'center',

        borderRadius: size.getHeightSize(8),

        flexDirection: 'row',
        justifyContent: 'center',
        gap: size.getWidthSize(16),
        paddingHorizontal: file ? size.getWidthSize(1) : size.getWidthSize(16),
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
              <View
                style={{
                  justifyContent: 'flex-end',
                  flex: 1,
                  gap: size.getHeightSize(8),
                }}
              >
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={19.6}
                  fontFamily="bold"
                  style={{
                    textAlign: 'left',
                    // flex: 1,
                  }}
                >
                  {description}
                </CText>
                <CText
                  color={'secondaryBlack'}
                  fontSize={14}
                  lineHeight={19.6}
                  fontFamily="semibold"
                  style={{
                    textAlign: 'left',
                    // flex: 1,
                  }}
                >
                  {fileName}
                </CText>
              </View>
            </View>
            <AttachmentRemoveIcon
              style={{
                alignSelf: 'center',
              }}
              width={size.getWidthSize(50)}
              height={size.getHeightSize(116)}
              onPress={() => {
                setFile('');
                onFileSelected?.({
                  name: '',
                  uri: '',
                  type: '',
                });
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
              onPress={() => {
                setFile('');
                onFileSelected?.({
                  name: '',
                  uri: '',
                  type: '',
                });
              }}
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
      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <CText fontSize={14} fontFamily="semibold" style={styles.title}>
              Upload from
            </CText>
            {typeOfFileToPick !== 'pdf' && (
              <>
                <Pressable
                  style={styles.optionButton}
                  onPress={() => {
                    setShowModal(false);
                    takePhoto();
                  }}
                >
                  <Feather name="camera" size={size.getHeightSize(16)} />
                  <CText
                    fontSize={13}
                    color="secondaryBlack"
                    style={styles.optionText}
                  >
                    Camera
                  </CText>
                </Pressable>
                <Pressable
                  style={styles.optionButton}
                  onPress={() => {
                    setShowModal(false);
                    pickImage();
                  }}
                >
                  <MaterialIcons
                    name="perm-media"
                    size={size.getHeightSize(16)}
                  />
                  <CText
                    fontSize={13}
                    color="secondaryBlack"
                    style={styles.optionText}
                  >
                    Gallery
                  </CText>
                </Pressable>
              </>
            )}

            {typeOfFileToPick !== 'image' && (
              <Pressable
                style={styles.optionButton}
                onPress={() => {
                  setShowModal(false);
                  pickDocument();
                }}
              >
                <Feather name="file" size={size.getHeightSize(16)} />
                <CText
                  fontSize={13}
                  color="secondaryBlack"
                  style={styles.optionText}
                >
                  Files
                </CText>
              </Pressable>
            )}
            <Pressable
              style={styles.closeButton}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <CText
                fontSize={13}
                color="secondaryBlack"
                style={styles.closeText}
              >
                Cancel
              </CText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
};

export default AttachmentView;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: size.getWidthSize(300),
    backgroundColor: colors.appBackground(),
    borderRadius: size.getHeightSize(16),
    padding: size.getHeightSize(16),
  },
  title: {
    marginBottom: size.getHeightSize(8),
    color: colors.black(),
    textAlign: 'left',
  },
  optionButton: {
    width: '100%',
    paddingVertical: size.getHeightSize(12),
    borderRadius: size.getHeightSize(8),
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(16),
  },
  optionText: {},
  closeButton: {
    marginTop: size.getHeightSize(8),
    alignItems: 'center',
  },
  closeText: {
    fontSize: size.getHeightSize(14),
    color: colors.primary(),
    fontWeight: '600',
  },
});
