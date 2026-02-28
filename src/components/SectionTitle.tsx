import { Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export const SectionTitle = ({ title }: { title: string }) => <Text style={styles.title}>{title}</Text>;

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10
  }
});
