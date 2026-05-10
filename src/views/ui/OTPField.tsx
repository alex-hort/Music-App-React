import colors from '@/utils/colors';
import { FC, forwardRef } from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  ref: any;
}
const OTPField: FC<Props> = forwardRef<TextInput, Props>((props, ref) => {
  return (
    <TextInput
      {...props}
      ref={ref}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.INACTIVE_CONTRAST}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    width: 45, // 👈 un poco más pequeño para que quepan bien
    height: 45,
    borderRadius: 25,
    borderColor: colors.SECONDARY,
    borderWidth: 2,
    textAlign: 'center',
    color: colors.SECONDARY, // 👈 texto en color dorado igual que el borde
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.05)', // 👈 fondo ligeramente visible
  },
});

export default OTPField;
