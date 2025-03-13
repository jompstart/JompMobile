import { StyleSheet, Pressable, View, Image } from 'react-native';
import React, { useState } from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from './CText';
import AAttachmentIcon from '../../assets/svgs/Dashboard/AttachmentIcon';
import AttachmentRemoveIcon from '../../assets/svgs/shared/AttachmentRemoveIcon';

interface Props {
  description: string;
  type: string;
  required?: boolean;
  onPress?: () => void;
  fileUri?: string;
}
const AttachmentView = ({
  fileUri,
  description,
  type,
  required,
  onPress,
}: Props) => {
  console.log(fileUri);
  const [file, setFile] = useState('');
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: size.getHeightSize(14),
        backgroundColor: fileUri ? colors.appBackground() : colors.white(),
        alignItems: 'center',

        borderRadius: size.getHeightSize(8),
        paddingHorizontal: size.getWidthSize(16),
        flexDirection: 'row',
        justifyContent: 'center',
        gap: size.getWidthSize(16),
      }}
    >
      {fileUri ? (
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
                source={{ uri: fileUri }}
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
