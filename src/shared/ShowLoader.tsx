import React from 'react';
import { StyleSheet, View } from 'react-native';
import Loader from '../../assets/svgs/Loader';
interface Props {
  isLoading: boolean;
}
const ShowLoader = ({ isLoading }: Props) => {
  return (
    <View
      style={{
        display: isLoading ? 'flex' : 'none',
        ...styles.loader,
      }}
    >
      <Loader />
    </View>
  );
};

export default ShowLoader;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#000000a0',
    zIndex: 10000000,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
