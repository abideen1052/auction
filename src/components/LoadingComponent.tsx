import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <ActivityIndicator size={'large'} color={'black'} />
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
