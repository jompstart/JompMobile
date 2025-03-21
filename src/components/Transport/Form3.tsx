import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { size } from '../../config/size';
import { colors } from '../../constants/colors';
import PhoneInput from '../../shared/PhoneInput';
import PTextInput from '../../shared/PTextInput';
import CText from '../../shared/CText';
import Asterisks from '../../../assets/svgs/Onboarding/Asterisks';
import AAttachmentIcon from '../../../assets/svgs/Dashboard/AttachmentIcon';
import OptionBox from '../../shared/OptionBox';
import Fontisto from '@expo/vector-icons/Fontisto';
import AttachmentView from '../../shared/AttachmentView';
import SelectBox from '../../../assets/svgs/Transport/SelectBox';
import SelectedBox from '../../../assets/svgs/Transport/SelectedBox';
import InfoIcon from '../../../assets/svgs/Transport/InfoIcon';
import { CustomerServicesContext } from '../../context/ServicesContext';
import { TransportProofOfEmployment } from '../../interface/provider';
const Form3 = () => {
  const [indentification, setIndetification] = useState<
    Array<'nin' | 'passport' | 'license' | 'voter'>
  >([]);
  const [proofOfEmployment, setProofOfEmployment] = useState<
    Array<'letter' | 'id' | 'regDoc'>
  >([]);
  const { transportDetails, setTransportDetails } = React.useContext(
    CustomerServicesContext
  );

  return (
    <View>
      {/* <View style={styles.row}>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          Please Select Identification Type
        </CText>
        <Asterisks size={size.getHeightSize(9.5)} />
      </View> */}
      {/* <View
        style={{
          gap: size.getHeightSize(16),
          marginBottom: size.getHeightSize(16),
        }}
      >
        <OptionBox
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="National ID Card"
          selected={indentification.includes('nin')}
          onSelect={() =>
            setIndetification((previous) => {
              if (previous.includes('nin')) {
                return previous.filter((item) => item !== 'nin');
              } else {
                return [...previous, 'nin'];
              }
            })
          }
        />
        <OptionBox
          selected={indentification.includes('passport')}
          onSelect={() =>
            setIndetification((previous) => {
              if (previous.includes('passport')) {
                return previous.filter((item) => item !== 'passport');
              } else {
                return [...previous, 'passport'];
              }
            })
          }
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="International Passport"
        />
        <OptionBox
          selected={indentification.includes('license')}
          onSelect={() =>
            setIndetification((previous) => {
              if (previous.includes('license')) {
                return previous.filter((item) => item !== 'license');
              } else {
                return [...previous, 'license'];
              }
            })
          }
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="Driver’s License"
        />
        <OptionBox
          selected={indentification.includes('voter')}
          onSelect={() =>
            setIndetification((previous) => {
              if (previous.includes('voter')) {
                return previous.filter((item) => item !== 'voter');
              } else {
                return [...previous, 'voter'];
              }
            })
          }
          deselectIcon={
            <Fontisto
              name="radio-btn-passive"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          selectIcon={
            <Fontisto
              name="radio-btn-active"
              size={size.getHeightSize(24)}
              color={colors.primary()}
            />
          }
          description="Voter’s Card"
        />
      </View> */}
      <AttachmentView
        description="Valid Means of Identification"
        type=".pdf, jpeg (max. 1MB)"
        required
        onFileSelected={(file) => {
          setTransportDetails('documentUploads', 'idFile', file);
        }}
      />
      <View style={styles.view3} />
      <View style={styles.row}>
        <CText
          color={'secondaryBlack'}
          fontSize={16}
          lineHeight={22.4}
          fontFamily="semibold"
        >
          Proof of Employment/Student ID/Business
        </CText>
        <Asterisks size={size.getHeightSize(9.5)} />
      </View>
      {/* <View
        style={{
          gap: size.getHeightSize(16),
        }}
      >
        <OptionBox
          onSelect={() => {
            transportDetails?.documentUploads?.proofOfEmployment?.some(
              (item) =>
                item.index == 1 &&
                item.value == TransportProofOfEmployment.letter
            )
              ? setTransportDetails(
                  'documentUploads',
                  'proofOfEmployment',
                  TransportProofOfEmployment.letter,
                  'remove',
                  1
                )
              : setTransportDetails(
                  'documentUploads',
                  'proofOfEmployment',
                  TransportProofOfEmployment.letter,
                  'add',
                  1
                );
          }}
          selected={transportDetails?.documentUploads?.proofOfEmployment?.some(
            (item) =>
              item.index === 1 &&
              item.value == TransportProofOfEmployment.letter
          )}
          deselectIcon={<SelectBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          description="Employment Letter"
        />
        <OptionBox
          onSelect={() => {
            transportDetails?.documentUploads?.proofOfEmployment?.some(
              (item) =>
                item.index == 2 && item.value == TransportProofOfEmployment.id
            )
              ? setTransportDetails(
                  'documentUploads',
                  'proofOfEmployment',
                  TransportProofOfEmployment.id,
                  'remove',
                  2
                )
              : setTransportDetails(
                  'documentUploads',
                  'proofOfEmployment',
                  TransportProofOfEmployment.id,
                  'add',
                  2
                );
          }}
          selected={transportDetails?.documentUploads?.proofOfEmployment?.some(
            (item) =>
              item.index === 2 && item.value == TransportProofOfEmployment.id
          )}
          deselectIcon={<SelectBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          description="Work ID/Student ID"
        />
        <OptionBox
          deselectIcon={<SelectBox size={size.getHeightSize(24)} />}
          selectIcon={<SelectedBox size={size.getHeightSize(24)} />}
          description="Business Registration Document"
          onSelect={() => {
            transportDetails?.documentUploads?.proofOfEmployment?.some(
              (item) =>
                item.index === 3 &&
                item.value === TransportProofOfEmployment.document
            )
              ? setTransportDetails(
                  'documentUploads',
                  'proofOfEmployment',
                  TransportProofOfEmployment.document,
                  'remove',
                  3
                )
              : setTransportDetails(
                  'documentUploads',
                  'proofOfEmployment',
                  TransportProofOfEmployment.document,
                  'add',
                  3
                );
          }}
          selected={transportDetails?.documentUploads?.proofOfEmployment?.some(
            (item) =>
              item.index === 3 &&
              item.value === TransportProofOfEmployment.document
          )}
        />
      </View> */}
      <View style={styles.view2}>
        <InfoIcon size={size.getHeightSize(24)} />
        <CText
          color={'primaryColor'}
          fontSize={14}
          lineHeight={19.6}
          fontFamily="regular"
          style={{
            textAlign: 'left',
            flex: 1,
          }}
        >
          If you are a student and employed or self employed, please upload both
          documents together, if you have.
        </CText>
      </View>
      <AttachmentView
        description="Proof of Employment. "
        type=".pdf, .jpeg (max. 1MB)"
        required
        onFileSelected={(file) => {
          setTransportDetails('documentUploads', 'proofOfEmployment', file);
        }}
      />
      <View style={styles.view3} />

      <View
        style={{
          gap: size.getHeightSize(16),
        }}
      >
        <AttachmentView
          description="Proof of Monthly Income (Bank statement showing last 6 month’s salary deposits). "
          type=".pdf, .xsl (max. 1MB)"
          required
          onFileSelected={(file) => {
            setTransportDetails('documentUploads', 'bankStatement', file);
          }}
        />
        <AttachmentView
          description="Proof of Monthly Income (Pay slip showing last 6 month’s salary deposits). "
          type=".pdf, .xsl (max. 1MB)"
          required
          onFileSelected={(file) => {
            setTransportDetails(
              'documentUploads',
              'proofOfMonthlyIncome',
              file
            );
          }}
        />

        <AttachmentView
          description="Utility Bill (Electricity, Water, or Water Bill - Not older than 3 months). "
          type=".pdf, .xsl (max. 1MB)"
          required
          onFileSelected={(file) => {
            setTransportDetails('documentUploads', 'utilityBill', file);
          }}
        />
      </View>
    </View>
  );
};

export default Form3;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: size.getWidthSize(10),
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: size.getWidthSize(7),
    paddingVertical: size.getHeightSize(10),
    paddingHorizontal: size.getWidthSize(14),
    backgroundColor: colors.primary('07'),
    marginTop: size.getHeightSize(16),
    borderRadius: size.getHeightSize(8),
    marginBottom: size.getHeightSize(16),
  },
  view3: {
    height: size.getHeightSize(1),
    backgroundColor: colors.primary('30'),
    marginVertical: size.getHeightSize(16),
  },
});
