import { FC } from "react";
import {View, StyleSheet, TextInput, TextInputProps} from "react-native";
import colors from '@/utils/colors';

interface Props extends TextInputProps {


}

const AppInput: FC<Props> = props => {
    return (
    
            <TextInput
               {...props}
                placeholderTextColor={colors.INACTIVE_CONTRAST}
                style={[styles.input, props.style]}
            />
    );


}


const styles = StyleSheet.create({

  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    height: 45,
    borderRadius: 22.5,
    color: colors.CONTRAST,
    paddingHorizontal: 15,
    marginBottom: 15,
  }
});

export default AppInput;