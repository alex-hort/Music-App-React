import { FC, useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import AppLink from '../ui/AppLink';
import AuthFormContainer from '@/components/form/AuthFormContainer';
import OTPField from '../ui/OTPField';
import AppButton from '../ui/AppButton';
import client from '@/api/client';
import { AuthStackParamList } from '@/@types/navigation';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<AuthStackParamList, 'Verification'>;

const otpFields = new Array(6).fill('');

const Verification: FC<Props> = ({ route }) => {
  const [otp, setOtp] = useState([...otpFields]);
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const { userInfo } = route.params;
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const inputRef = useRef<TextInput>(null);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];

    if (value === 'Backspace') {
      if (!newOtp[index]) setActiveOtpIndex(index - 1);
      newOtp[index] = '';
    } else {
      setActiveOtpIndex(index + 1);
      newOtp[index] = value;
    }
    setOtp([...newOtp]);
  };

  const handlePaste = (value: string) => {
    if (value.length === 6) {
      Keyboard.dismiss();
      const newOtp = value.split('');
      setOtp([...newOtp]);
    }
  };

  const isValidOtp = otp.every(value => {
    return value.trim();
  });

  const handleSubmit = async () => {
    if (!isValidOtp) return;
    try {
      const {data} = await client.post('/auth/verify', { userId: userInfo.id, token: otp.join('') });

      navigation.navigate("SignIn")
    } catch (error) {
      console.log("Verification error:", error);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  return (
    <AuthFormContainer heading="Please look at your email.">
      <View style={styles.inputContainer}>
        {otpFields.map((_, index) => {
          return (
            <OTPField
              ref={activeOtpIndex === index ? inputRef : null}
              key={index}
              placeholder="•"
              value={otp[index]}
              onKeyPress={({ nativeEvent }) => {
                handleChange(nativeEvent.key, index);
              }}
              onChangeText={value => handlePaste(value)} // 👈 corregido, era string no otp[index]
              maxLength={1}
              keyboardType="numeric"
            />
          );
        })}
      </View>

      <AppButton title="Submit" onPress={handleSubmit} />

      <View style={styles.linkContainer}>
        <AppLink title="Re-send OTP" />
      </View>
    </AuthFormContainer>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  linkContainer: {
    marginTop: 16,
    width: '100%',
    alignItems: 'flex-end',
  },
});

export default Verification;
