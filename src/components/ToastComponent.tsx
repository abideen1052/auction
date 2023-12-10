import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setErrorToastModalVisible} from '../redux/modal/ModalSlice';
import WarningIcon from '../assets/icons/exclamation.svg';

const ToastComponent = ({message}: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setErrorToastModalVisible(false));
    }, 1000);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.toast}>
        <WarningIcon height={20} width={20} fill={'white'} />
        <Text style={styles.errorText}>{message}</Text>
      </View>
    </View>
  );
};

export default ToastComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  toast: {
    height: 40,
    width: '90%',
    backgroundColor: 'red',
    marginBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  errorText: {
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
