import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import AppButton from '@/views/ui/AppButton';

interface Props {
  title: string;
}

const SubmitBtn: FC<Props> = props => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <AppButton
      busy={isSubmitting}
      onPress={() => handleSubmit()}
      title={props.title}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default SubmitBtn;
