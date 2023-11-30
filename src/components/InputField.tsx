import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import EmailIcon from '../assets/icons/email.svg';

const InputField = ({
  value,
  onChangeText,
  placeHolder,
  secureTextEntry,
  icon,
}: any) => {
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeHolder}
        placeholderTextColor="black"
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        selectTextOnFocus={true}
      />
      <View style={styles.iconContainer}>
        <EmailIcon style={icon} fill={'black'} />
      </View>
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
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
});

export default InputField;
