import { ScrollView, StyleSheet, Text } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { SectionTitle } from '@/components/SectionTitle';
import { colors } from '@/theme/colors';

const alerts = [
  { id: 'a1', level: 'HIGH', message: 'Avoid Bosso road after 18:00 due to predicted risk window.' },
  { id: 'a2', level: 'MED', message: 'Travel Guardian checkpoint reminder due in 10 minutes.' },
  { id: 'a3', level: 'INFO', message: 'Community vigilante patrol increased in Chanchaga axis.' }
];

export const AlertsScreen = () => (
  <ScrollView style={styles.container} contentContainerStyle={styles.content}>
    <SectionTitle title="Alerts & Intelligence" />
    {alerts.map((alert) => (
      <AppCard key={alert.id}>
        <Text style={styles.level}>{alert.level}</Text>
        <Text style={styles.message}>{alert.message}</Text>
      </AppCard>
    ))}

    <AppCard>
      <Text style={styles.message}>Incident verification status: ✅ Verified / 🟡 Unconfirmed / 🔴 False</Text>
      <Text style={styles.message}>Automatic retry service will re-dispatch failed alerts when data returns.</Text>
    </AppCard>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 30 },
  level: { color: colors.primary, fontWeight: '800', marginBottom: 8 },
  message: { color: colors.text, marginBottom: 6 }
});
