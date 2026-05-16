import FileSelector from '@/components/FileSelector';
import colors from '@/utils/colors';
import { FC } from 'react';
import { View, StyleSheet, TextInput , ScrollView} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppButton from './ui/AppButton';
import CategorySelector from '@/components/CategorySelector';


interface Props {}

const Upload: FC<Props> = props => {
  return (
    <ScrollView  style={styles.fileSelectorContainer} > 
   
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon={
            <MaterialComIcon
              name="image-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Poster"
        />

        <FileSelector
          icon={
            <MaterialComIcon
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{ marginLeft: 20 }}
        />
      </View>
      <View style={styles.fromContainer}>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="Title"
          style={styles.input}
        />

         <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="About"
          style={styles.input}
          numberOfLines={10}
          multiline
        />

        <CategorySelector visible title=" Category"/>

        <AppButton borderRadius={7} title='Submit'/>

        
      </View>

</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  fileSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  fromContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});

export default Upload;
