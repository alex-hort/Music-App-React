import {FC} from 'react';
import {StyleSheet, Button} from 'react-native';
import { useFormikContext } from 'formik';

interface Props {
    title: string
}

const SubmitBtn: FC<Props> = (props) => {
    const { handleSubmit } = useFormikContext();

    return <Button onPress={() => handleSubmit()} title={props.title} />;
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    }
})

export default SubmitBtn;