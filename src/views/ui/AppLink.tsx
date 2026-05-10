import e from 'express';
import { FC } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';

interface Props {
  title: string;
  onPress?(): void;
}

const AppLink: FC<Props> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
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
