import {StyleSheet, View} from 'react-native';
import React from 'react';
import MenuIcon from '../assets/icons/menu.svg';
import UserIcon from '../assets/icons/user.svg';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerButton}>
        <MenuIcon height={24} width={24} fill={'#9A9EA7'} />
      </View>
      <View style={styles.headerButton}>
        <UserIcon height={24} width={24} fill={'#9A9EA7'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: '100%',
    backgroundColor: 'white',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    height: 50,
    width: 50,
    backgroundColor: '#E4E6E8',
    alignSelf: 'flex-end',
    margin: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
