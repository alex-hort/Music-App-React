import colors from '@/utils/colors';
import { FC } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {}

const SignUp: FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Alex Horteales"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />

        <Text style={styles.label}>Email</Text>

        <TextInput
          placeholder="alexhort@email.com"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="********"
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          style={styles.input}
        />
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
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 22.5,
    color: colors.CONTRAST,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  label: {
    color: colors.CONTRAST,
  },
  formContainer: {
    width: '100%',
  },
});

export default SignUp;
