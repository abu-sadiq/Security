import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useNscStore } from '@/store/useNscStore';
import { colors } from '@/theme/colors';
import { useState } from 'react';

export const ProfileScreen = () => {
  const profile = useNscStore((s) => s.profile);
  const [voiceSOS, setVoiceSOS] = useState(true);
  const [childMode, setChildMode] = useState(false);
  const [autoEvidence, setAutoEvidence] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="Citizen Profile & Controls" />

      <AppCard>
        <Text style={styles.field}>Name: {profile.fullName}</Text>
        <Text style={styles.field}>Phone: {profile.phone}</Text>
        <Text style={styles.field}>Blood Group: {profile.bloodGroup}</Text>
        <Text style={styles.field}>Emergency Contact: {profile.emergencyContact}</Text>
      </AppCard>

      <AppCard>
        <ToggleRow title="Voice SOS" enabled={voiceSOS} onChange={setVoiceSOS} />
        <ToggleRow title="Child Emergency Mode" enabled={childMode} onChange={setChildMode} />
        <ToggleRow title="Auto Evidence Upload" enabled={autoEvidence} onChange={setAutoEvidence} />
      </AppCard>

      <AppCard>
        <Text style={styles.title}>Scale & Reliability Architecture</Text>
        <Text style={styles.bullet}>• Multi-region cloud + CDN + edge APIs for 1M+ users</Text>
        <Text style={styles.bullet}>• Message queues (Kafka/SQS) for alert fan-out</Text>
        <Text style={styles.bullet}>• Offline-first local queue with retry and SMS fallback</Text>
        <Text style={styles.bullet}>• Event audit trail, fraud checks, incident verification AI</Text>
        <Text style={styles.bullet}>• Zero-trust auth, encryption at rest/in transit, key rotation</Text>
      </AppCard>
    </ScrollView>
  );
};

const ToggleRow = ({ title, enabled, onChange }: { title: string; enabled: boolean; onChange: (value: boolean) => void }) => (
  <View style={styles.toggleRow}>
    <Text style={styles.field}>{title}</Text>
    <Switch value={enabled} onValueChange={onChange} thumbColor={enabled ? colors.success : '#bbb'} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 32 },
  field: { color: colors.text, marginBottom: 8 },
  title: { color: colors.text, fontWeight: '700', marginBottom: 10 },
  bullet: { color: colors.muted, marginBottom: 5 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }
});
