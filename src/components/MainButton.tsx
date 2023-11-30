import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const MainButton = ({onPress, title, customStyle, titleStyle}: any) => {
  return (
    <TouchableOpacity
      style={[styles.container, customStyle]}
      onPress={onPress}
      activeOpacity={0.6}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
