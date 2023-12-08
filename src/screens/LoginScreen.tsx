/* eslint-disable no-lone-blocks */
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import InputField from '../components/InputField';
import MainButton from '../components/MainButton';
import Divider from '../components/Divider';
import EmailIcon from '../assets/icons/mail.svg';
import ShowIcon from '../assets/icons/show.svg';
import HideIcon from '../assets/icons/hide.svg';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {handleReduxLogin, setIsLoading} from '../redux/login/LoginSlice';
import LoadingComponent from '../components/LoadingComponent';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isSecure} = useSelector((state: RootState) => state.securePassword);
  const credential = JSON.stringify({email, password});
  console.log(credential);
  const {isLoading} = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async (values: any) => {
    const res = await dispatch(handleReduxLogin(values));
    console.log('Result', res.payload);
    if (res.payload && res.payload.success) {
      dispatch(setIsLoading(false));
      navigation.replace('InventoryList');
    } else if (res.payload) {
      dispatch(setIsLoading(false));
      console.log('Response Error:', res.payload.message);
    } else {
      dispatch(setIsLoading(false));
      console.log('Network error');
    }
  };
  {
    if (isLoading) {
      return <LoadingComponent />;
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/images/Images.png')}
        />
        <Image
          style={styles.logo}
          source={require('../assets/images/Logo.png')}
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.headText}>You're Welcome</Text>
        <Text style={styles.subText}>Enter your Login Details</Text>
        <InputField
          placeHolder={'Dealer ID/ Mobile Number'}
          onChangeText={(input: string) => setEmail(input)}
          value={email}
          icon={<EmailIcon style={styles.iconStyle} fill="black" />}
        />
        <InputField
          placeHolder={'Password'}
          onChangeText={(input: string) => setPassword(input)}
          value={password}
          icon={
            isSecure ? (
              <ShowIcon
                style={password.length > 0 && styles.iconStyle}
                fill="black"
              />
            ) : (
              <HideIcon
                style={password.length > 0 && styles.iconStyle}
                fill="black"
              />
            )
          }
          secureTextEntry
        />
        <MainButton
          title="Login"
          customStyle={styles.loginButton}
          titleStyle={styles.loginText}
          onPress={() => handleLogin(credential)}
        />
        <Text style={styles.optionText}>
          Log in with OTP | Forgot Password?
        </Text>
        <Divider />
        <MainButton
          title="Register"
          customStyle={styles.registerButton}
          titleStyle={styles.registerText}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '100%',
  },
  logo: {
    position: 'absolute',
    marginTop: 80,
  },
  loginContainer: {
    width: '100%',
    height: '65%',
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    elevation: 3,
  },
  headText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    marginVertical: 20,
  },
  subText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 10,
  },
  iconStyle: {
    height: 25,
    width: 25,
    marginRight: 15,
  },
  loginButton: {
    backgroundColor: '#F7B40D',
  },
  optionText: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
  },
  registerButton: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  loginText: {
    color: 'white',
  },
  registerText: {
    color: 'black',
  },
});
