import colors from '@/utils/colors';
import { FC } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Form from '@/components/form';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthInputField from '@/components/form/AuthInputFiled';
import * as yup from 'yup';
import SubmitBtn from '@/components/form/SubmitBtn';

interface Props {}

const SignUp: FC<Props> = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const signUpValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Form
        onSubmit={values => {}}
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
      >
        <View style={styles.formContainer}>
          <AuthInputField
            name="name"
            placeholder="Alexis Horteales"
            label="Name"
            containerStyle={styles.marginBottom}
          ></AuthInputField>

          <AuthInputField
            name="email"
            placeholder="ahorte@gmail.com"
            label="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          ></AuthInputField>

          <AuthInputField
            name="password"
            placeholder="********"
            label="Password"
            autoCapitalize="none"
            secureTextEntry={true}
          ></AuthInputField>
          <SubmitBtn title="Sign Up"></SubmitBtn>
        </View>
      </Form>
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
    marginBottom: 20,
  },
});

export default SignUp;
