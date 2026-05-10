import React, { FC, useEffect } from 'react';
import colors from '@/utils/colors';
import AppInput from '@/views/ui/AppInput';
import {
  View,
  Text,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import { useFormikContext } from 'formik';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  rightIcon?: React.ReactNode;
  onRightIconPress?(): void;
}

const AuthInputFiedl: FC<Props> = props => {
  const inputTransformValue = useSharedValue(0);
  const { handleChange, values, errors, touched, handleBlur } =
    useFormikContext<{ [key: string]: string }>();

  const {
    placeholder,
    label,
    keyboardType,
    autoCapitalize,
    secureTextEntry,
    containerStyle,
    name,
    rightIcon,
    onRightIconPress,
  } = props;

  const errorMessage = touched[name] && errors[name] ? errors[name] : '';

  const shakeUI = () => {
    inputTransformValue.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withSpring(0, {
        damping: 5,
        mass: 0.5,
        stiffness: 1000,
      }),
    );
  };

  const inputStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: inputTransformValue.value }],
    };
  });

  useEffect(() => {
    if (errorMessage) {
      shakeUI();
    }
  });

  return (
    <Animated.View
      style={[containerStyle, inputStyle, { position: 'relative' }]}
    >
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
        value={values[name]}
        onBlur={handleBlur(name)}
      />
      {rightIcon ? (
        <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
          {' '}
          {rightIcon}{' '}
        </Pressable>
      ) : null}

      <View></View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  label: {
    color: colors.CONTRAST,
  },
  errorMessage: {
    color: colors.ERROR,
  },
  rightIcon: {
    width: 45,
    height: 45,
    position: 'absolute',
    bottom: 15, // cambia top: 0 por bottom: 0
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthInputFiedl;
