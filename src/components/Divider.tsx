import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Divider = () => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <View>
        <Text style={styles.dividerText}>Or</Text>
      </View>
      <View style={styles.dividerLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dividerLine: {
    width: 50,
    height: 1,
    backgroundColor: 'grey',
  },
  dividerText: {
    width: 50,
    textAlign: 'center',
    color: 'grey',
  },
});

export default Divider;
