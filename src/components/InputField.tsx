import React from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setIsSecure} from '../redux/securePassword/securePasswordSlice';

const InputField = ({
  value,
  onChangeText,
  placeHolder,
  secureTextEntry,
  icon,
}: any) => {
  const {isSecure} = useSelector((state: RootState) => state.securePassword);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={isSecure ? secureTextEntry : false}
        placeholder={placeHolder}
        placeholderTextColor="black"
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        selectTextOnFocus={true}
      />
      <Pressable
        style={styles.iconContainer}
        onPress={() => dispatch(setIsSecure(!isSecure))}>
        {icon}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 50,
    borderRadius: 8,
    paddingLeft: 15,
    backgroundColor: 'white',
    marginTop: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 15,
  },
  inputStyle: {
    fontSize: 15,
    color: 'black',
    width: '85%',
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
  },
});

export default InputField;
