import {FC} from 'react';
import colors from '@/utils/colors';
import {View, Text, StyleSheet, TextInputProps, StyleProp, ViewStyle} from 'react-native'
import AppInput from '@/views/ui/AppInput';
import e from 'express';

 

interface Props {
    label?: string
    placeholder?: string;
    keyboardType?: TextInputProps['keyboardType']
    autoCapitalize?: TextInputProps['autoCapitalize']
    secureTextEntry?: boolean
    containerStyle?: StyleProp<ViewStyle>
}

const AuthInputFiedl : FC<Props> = props => {
    const { placeholder, label, keyboardType , autoCapitalize, secureTextEntry, containerStyle} = props;

    return <View style = {[styles.container, containerStyle]}>
        <Text style= {styles.label}>{label}</Text>
        <AppInput placeholder={placeholder}
        keyboardType={keyboardType} autoCapitalize={autoCapitalize}
        secureTextEntry=  {secureTextEntry}
        
        />
    </View>

}

const styles = StyleSheet.create({
 container: {

  },
  label: {
    color: colors.CONTRAST,
    padding: 5
  }
})

export default AuthInputFiedl;