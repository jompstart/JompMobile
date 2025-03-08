import { StyleSheet, Pressable, View } from 'react-native';
import React from 'react';
import { size } from '../config/size';
import { colors } from '../constants/colors';
import CText from './CText';
import AAttachmentIcon from '../../assets/svgs/Dashboard/AttachmentIcon';

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
  console.log('======= file uri ========');
  console.log(fileUri);
  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingVertical: size.getHeightSize(14),
        backgroundColor: colors.white(),
        alignItems: 'center',
        gap: size.getHeightSize(8),

        borderRadius: size.getHeightSize(8),
        paddingHorizontal: size.getWidthSize(16),
      }}
    >
      <AAttachmentIcon size={size.getHeightSize(40)} />
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
    </Pressable>
  );
};

export default AttachmentView;

const styles = StyleSheet.create({});
