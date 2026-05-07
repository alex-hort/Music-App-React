import { FC } from 'react';
import colors from '@/utils/colors';
import AppInput from '@/views/ui/AppInput';
import {
  View,
  Text,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {  useFormikContext } from 'formik';




interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const AuthInputFiedl: FC<Props> = props => {
  const {handleChange, values, errors,touched ,handleBlur} = useFormikContext<{[key: string]: string}>();

    const {
    placeholder,
    label,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    containerStyle,
    name
  } = props;

  const errorMessage = touched[name] && errors[name] ? errors[name] : '';



  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>

      <AppInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange(name)}
        value= {values[name]}
        onBlur={handleBlur(name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   padding: 5

  },
  label: {
    color: colors.CONTRAST,

  },
  errorMessage: {
    color: colors.ERROR,
  },
});

export default AuthInputFiedl;
