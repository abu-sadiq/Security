import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

export const StatChip = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.chip}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: '#1d3459',
    borderRadius: 12,
    padding: 10,
    minWidth: 100
  },
  label: { color: colors.muted, fontSize: 12 },
  value: { color: colors.text, fontWeight: '700', marginTop: 4 }
});
