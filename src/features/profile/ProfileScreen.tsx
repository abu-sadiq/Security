import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useNscStore } from '@/store/useNscStore';
import { colors } from '@/theme/colors';

export const ProfileScreen = () => {
  const { profile, featureToggles, setFeatureToggle } = useNscStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="Citizen Profile & Controls" />

      <AppCard>
        <Text style={styles.field}>Name: {profile.fullName}</Text>
        <Text style={styles.field}>Phone: {profile.phone}</Text>
        <Text style={styles.field}>Blood Group: {profile.bloodGroup}</Text>
        <Text style={styles.field}>Language: {profile.language}</Text>
      </AppCard>

      <AppCard>
        <ToggleRow title="Voice SOS" enabled={featureToggles.voiceSOS} onChange={(value) => setFeatureToggle('voiceSOS', value)} />
        <ToggleRow title="Child Emergency Mode" enabled={featureToggles.childEmergencyMode} onChange={(value) => setFeatureToggle('childEmergencyMode', value)} />
        <ToggleRow title="Discreet Launcher" enabled={featureToggles.discreetLauncher} onChange={(value) => setFeatureToggle('discreetLauncher', value)} />
        <ToggleRow title="Auto Evidence Upload" enabled={featureToggles.autoEvidenceUpload} onChange={(value) => setFeatureToggle('autoEvidenceUpload', value)} />
        <ToggleRow title="Auto Escalate Travel Guardian" enabled={featureToggles.travelGuardianAutoEscalate} onChange={(value) => setFeatureToggle('travelGuardianAutoEscalate', value)} />
        <ToggleRow title="Blood Emergency Broadcast" enabled={featureToggles.bloodEmergencyBroadcast} onChange={(value) => setFeatureToggle('bloodEmergencyBroadcast', value)} />
      </AppCard>

      <AppCard>
        <Text style={styles.title}>Scale Architecture for 1M+ Users</Text>
        <Text style={styles.bullet}>• Multi-region cloud + CDN + edge APIs</Text>
        <Text style={styles.bullet}>• Queue-based alert fan-out (Kafka/SQS)</Text>
        <Text style={styles.bullet}>• Offline-first local queue + SMS fallback</Text>
        <Text style={styles.bullet}>• NDPA aligned security, encryption and access policies</Text>
        <Text style={styles.bullet}>• Incident quality model and false-report mitigation</Text>
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
  field: { color: colors.text, marginBottom: 8, flex: 1 },
  title: { color: colors.text, fontWeight: '700', marginBottom: 10 },
  bullet: { color: colors.muted, marginBottom: 5 },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, gap: 8 }
});
