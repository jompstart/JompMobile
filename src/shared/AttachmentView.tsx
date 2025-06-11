import {
  StyleSheet,
  Pressable,
  View,
  Alert,
  Image,
  Modal,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from './CText';
import PdfIcon from '../../assets/svgs/shared/PdfIcon';
import * as DocumentPicker from 'expo-document-picker';
import AAttachmentIcon from '../../assets/svgs/Dashboard/AttachmentIcon';
import AttachmentRemoveIcon from '../../assets/svgs/shared/AttachmentRemoveIcon';
import {
  launchImageLibraryAsync,
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
  onFileSelected,
  typeOfFileToPick,
}: Props) => {
  const [file, setFile] = useState('');
  const [fileType, setFileType] = useState<'pdf' | 'image' | null>(null);
  const [fileName, setFileName] = useState('');

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<
    (() => Promise<void>) | null
  >(null);

  useEffect(() => {
    if (!showModal && pendingAction && Platform.OS === 'android') {
      pendingAction().finally(() => setPendingAction(null));
    }
  }, [showModal]);

  async function verifyPermission() {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) {
        Alert.alert(
          'Insufficient permission!',
          'You need to grant camera access to use this app.'
        );
      }
      return permissionResponse.granted;
    }

    return true;
  }

  const handleImageResult = (result: any) => {
    if (result?.assets?.length > 0) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const formattedUri = uri.startsWith('file://') ? uri : 'file://' + uri;
      const fileName = asset.fileName ?? `image-${Date.now()}.jpg`;

      setFile(formattedUri);
      setFileType('image');
      setFileName(fileName);

      onFileSelected?.({
        name: fileName,
        uri: formattedUri,
        type: asset.mimeType ?? 'image/jpeg',
      });
    }
  };

  const pickImage = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;

    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      handleImageResult(result);
    } catch (err) {
      console.error('Image picking error:', err);
    }
  };

  const takePhoto = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    try {
      const result = await launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        quality: 1,
      });
      handleImageResult(result);
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const asset = result.assets[0];
        const uri = asset.uri;
        const formattedUri = uri.startsWith('file://') ? uri : 'file://' + uri;

        setFile(formattedUri);
        setFileType('pdf');
        setFileName(asset.name ?? 'document.pdf');

        onFileSelected?.({
          name: asset.name ?? 'document.pdf',
          uri: formattedUri,
          type: asset.mimeType ?? 'application/pdf',
        });
      }
    } catch (error) {
      console.error('Document picker error:', error);
    }
  };

  const handleRemoveFile = () => {
    setFile('');
    setFileType(null);
    setFileName('');
    onFileSelected?.({ name: '', uri: '', type: '' });
  };

  return (
    <Pressable
      onPress={() => {
        if (typeOfFileToPick === 'pdf') {
          pickDocument();
        } else {
          setShowModal(true);
        }
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
        fileType === 'pdf' ? (
          <>
            <View style={styles.pdfContainer}>
              <PdfIcon size={size.getHeightSize(84)} />
              <View style={styles.pdfTextContainer}>
                <CText color="secondaryBlack" fontSize={14} fontFamily="bold">
                  {description}
                </CText>
                <CText
                  color="secondaryBlack"
                  fontSize={14}
                  fontFamily="semibold"
                >
                  {fileName}
                </CText>
              </View>
            </View>
            <AttachmentRemoveIcon
              style={{ alignSelf: 'center' }}
              width={size.getWidthSize(50)}
              height={size.getHeightSize(116)}
              onPress={handleRemoveFile}
            />
          </>
        ) : (
          <>
            <View style={styles.pdfContainer}>
              <Image source={{ uri: file }} style={styles.imagePreview} />
              <View style={styles.pdfTextContainer}>
                <CText color="secondaryBlack" fontSize={14} fontFamily="bold">
                  {description}
                </CText>
                <CText
                  color="secondaryBlack"
                  fontSize={14}
                  fontFamily="semibold"
                >
                  {fileName}
                </CText>
              </View>
            </View>
            <AttachmentRemoveIcon
              style={{ alignSelf: 'center' }}
              width={size.getWidthSize(50)}
              height={size.getHeightSize(116)}
              onPress={handleRemoveFile}
            />
          </>
        )
      ) : (
        <View style={{ gap: size.getHeightSize(8) }}>
          <AAttachmentIcon
            style={{ alignSelf: 'center' }}
            size={size.getHeightSize(40)}
          />
          <CText
            color="secondaryBlack"
            fontSize={14}
            fontFamily="semibold"
            style={{ textAlign: 'center' }}
          >
            {description}{' '}
            <CText color="primaryColor" fontSize={14} fontFamily="bold">
              Click to upload{' '}
              {required && (
                <CText color="warning" fontSize={18} fontFamily="bold">
                  *
                </CText>
              )}
            </CText>
            {'\n'}
            {type}
          </CText>
        </View>
      )}

      <Modal
        transparent
        visible={showModal}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
        onDismiss={() => {
          if (pendingAction && Platform.OS === 'ios') {
            pendingAction().finally(() => setPendingAction(null));
          }
        }}
      >
        <Pressable style={styles.overlay} onPress={() => setShowModal(false)}>
          <Pressable style={styles.modalContainer} onPress={() => {}}>
            <CText fontSize={14} fontFamily="semibold" style={styles.title}>
              Upload from
            </CText>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                setPendingAction(() => takePhoto);
                setShowModal(false);
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
                setPendingAction(() => pickImage);
                setShowModal(false);
              }}
            >
              <MaterialIcons name="perm-media" size={size.getHeightSize(16)} />
              <CText
                fontSize={13}
                color="secondaryBlack"
                style={styles.optionText}
              >
                Gallery
              </CText>
            </Pressable>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                setPendingAction(() => pickDocument);
                setShowModal(false);
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

            <Pressable
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <CText
                fontSize={13}
                color="secondaryBlack"
                style={styles.closeText}
              >
                Cancel
              </CText>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </Pressable>
  );
};

export default AttachmentView;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    color: colors.primary(),
    fontWeight: '600',
  },
  pdfContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: size.getWidthSize(4),
    flex: 1,
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(16),
  },
  pdfTextContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    gap: size.getHeightSize(8),
  },
  imageContainer: {
    flex: 1,
    backgroundColor: colors.white(),
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    paddingHorizontal: size.getWidthSize(16),
  },
  imagePreview: {
    width: size.getWidthSize(121),
    height: size.getHeightSize(84),
    borderRadius: size.getHeightSize(8),
  },
});
