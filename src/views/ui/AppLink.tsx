
import { FC } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

interface Props {
  title: string;
  onPress?(): void;
  active?: boolean;
}

const AppLink: FC<Props> = ({ title, onPress, active }) => {
  return (
    <Pressable onPress={active ? onPress : null} style={{ opacity: active ? 1 : 0.4 }}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#ede1e1',
  },
});

export default AppLink;
