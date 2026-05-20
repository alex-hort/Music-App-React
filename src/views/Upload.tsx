import FileSelector from '@/components/FileSelector';
import colors from '@/utils/colors';
import { FC, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import AppButton from './ui/AppButton';
import CategorySelector from '@/components/CategorySelector';
import { categories } from '@/utils/categories';
import { DocumentPickerResponse, types } from 'react-native-document-picker';
import client from '@/api/client';
import { getFromAsyncStorage, Keys } from '@/utils/asyncStorage';
import Progress from './ui/Progress';
import { mapRange } from '@/utils/math';
import { catchAsyncError } from '@/api/catchError';
import { uploadNotification } from '@/store/notification';
import { useDispatch } from 'react-redux';

interface FormFields {
  title: string;
  category: string;
  about: string;
  file?: undefined;
  poster?: undefined;
}

const defaultForm: FormFields = {
  title: '',
  category: '',
  about: '',
};

const audioInfoSchema = yup.object().shape({
  title: yup.string().trim().required('Title is required'),
  category: yup.string().oneOf(categories).required('Category is required'),
  about: yup.string().trim().required('About is required'),
  type: yup.string().required('Audio file is required'),
  file: yup
    .object()
    .shape({
      uri: yup.string().required(),
      name: yup.string().required(),
      type: yup.string().required(),
    })
    .required('Audio file is required'),
  poster: yup
    .object()
    .shape({
      uri: yup.string().required(),
      name: yup.string().required(),
      type: yup.string().required(),
    })
    .required('Poster image is required'),
});

interface Props {}

const Upload: FC<Props> = props => {
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [audioInfo, setAudioInfo] = useState({ ...defaultForm });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch();

  const handleUpload = async () => {
    try {
      const data = await audioInfoSchema.validate(audioInfo);
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('category', data.category);
      formData.append('about', data.about);
      formData.append('file', {
        uri: data.file.uri,
        name: data.file.name,
        type: data.file.type,
      });

      if (data.poster.uri) {
        formData.append('poster', {
          name: data.poster.name,
          type: data.poster.type,
          uri: data.poster.uri,
        });

        const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
        const response = await client.post('/audio/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress(progressEvent) {
            const uploaded = mapRange({
              inputMin: 0,
              inputMax: progressEvent.total || 0,
              outputMin: 0,
              outputMax: 100,
              inputValue: progressEvent.loaded,
            });

            if (uploaded >= 100) {
              setAudioInfo({ ...defaultForm });
              setBusy(false);
            }

            setUploadProgress(Math.floor(uploaded));
          },
        });
      }
    } catch (err) {
     
      const errorMessage = catchAsyncError(err);

      dispatch(uploadNotification({ message: errorMessage, type: 'error' }));
      }
    }
    setBusy(false);
  };
  return (
    <ScrollView style={styles.fileSelectorContainer}>
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
          options={{ type: [types.images] }}
          onSelect={file => {
            setAudioInfo({ ...audioInfo, poster: file });
          }}
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
          options={{ type: [types.audio] }}
          onSelect={file => {
            setAudioInfo({ ...audioInfo, file: file });
          }}
        />
      </View>
      <View style={styles.fromContainer}>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="Title"
          style={styles.input}
          value={audioInfo.title}
          onChangeText={title => setAudioInfo({ ...audioInfo, title })}
        />
        value={audioInfo.title}
        <Pressable
          onPress={() => {
            setShowCategorySelector(true);
          }}
          style={styles.categorySelector}
        >
          <Text style={styles.categorySelectorTitle}>Select Category</Text>
          <Text style={styles.selectedCategory}>
            {audioInfo.category || 'None selected'}
          </Text>
        </Pressable>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="About"
          style={styles.input}
          numberOfLines={10}
          multiline
          value={audioInfo.about}
          onChangeText={about => setAudioInfo({ ...audioInfo, about })}
        />
        value={audioInfo.about}
        <CategorySelector
          visible={showCategorySelector}
          onRequestClose={() => {
            setShowCategorySelector(false);
          }}
          title=" Category"
          data={categories}
          renderItem={item => {
            return <Text style={styles.categoryItem}>{item}</Text>;
          }}
          onSelect={item => {
            setAudioInfo({ ...audioInfo, category: item });
          }}
        />
        <View style={{ marginVertical: 20 }}>
          {busy ? <Progress progress={uploadProgress} /> : null}
        </View>
        <AppButton
          busy={busy}
          borderRadius={7}
          title="Submit"
          onPress={handleUpload}
        />
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
    textAlignVertical: 'top',
  },
  categoryItem: {
    padding: 10,
    fontSize: 16,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default Upload;
