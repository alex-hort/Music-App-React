import AppInput from '../ui/AppInput';
import colors from '@/utils/colors';
import { FC } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthInputField from '@/components/AuthInputFiled';

interface Props {}

const SignUp: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <AuthInputField
          placeholder="Alexis Horteales"
          label="Name" containerStyle= {styles.marginBottom}
        ></AuthInputField>

        <AuthInputField
          placeholder="ahorte@gmail.com"
          label="Email" 
          keyboardType="email-address" 
          autoCapitalize='none'
          containerStyle= {styles.marginBottom}

        ></AuthInputField>

        <AuthInputField
          placeholder="********"
          label="Password" autoCapitalize='none' secureTextEntry={true}
        ></AuthInputField>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20
  }
});

export default SignUp;
