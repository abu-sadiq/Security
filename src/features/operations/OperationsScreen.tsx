import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useNscStore } from '@/store/useNscStore';
import { colors } from '@/theme/colors';

const safeLocations = [
  { name: 'Minna Central Police Station', kind: 'Police', phone: '08030000001', open: '24/7' },
  { name: 'Ibrahim Badamasi Hospital', kind: 'Hospital', phone: '08030000003', open: '24/7' },
  { name: 'SafeStay Hotel', kind: 'Secure hotel', phone: '08031112223', open: '24/7' },
  { name: 'FuelSafe Bosso', kind: 'Fuel station', phone: '08035554466', open: '24/7' }
];

export const OperationsScreen = () => {
  const { trustedCircle, agencies, featureToggles } = useNscStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="Field Operations" />

      <AppCard>
        <Text style={styles.title}>Nearest Agency Matching</Text>
        {agencies.map((agency) => (
          <View key={agency.id} style={styles.row}>
            <Text style={styles.text}>{agency.name} ({agency.type}) • {agency.status}</Text>
            <Text onPress={() => Linking.openURL(`tel:${agency.phone}`)} style={styles.action}>Call</Text>
          </View>
        ))}
      </AppCard>

      <AppCard>
        <Text style={styles.title}>Community Safety Circle</Text>
        {trustedCircle.map((member) => (
          <Text key={member.id} style={styles.text}>• {member.name} ({member.relationship}) — {member.phone}</Text>
        ))}
        <Text style={styles.hint}>Group SOS, live route sharing and automatic check-in escalation are active.</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.title}>Travel Guardian Mode</Text>
        <Text style={styles.text}>• Destination safety scoring</Text>
        <Text style={styles.text}>• Geofenced check-ins every 15 mins</Text>
        <Text style={styles.text}>• Fake incoming call escape option</Text>
        <Text style={styles.text}>• No-response triggers auto-SOS</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.title}>Evidence & Verification</Text>
        <Text style={styles.text}>• Encrypted photo/video/audio upload</Text>
        <Text style={styles.text}>• Incident verification engine (verified/unconfirmed/false)</Text>
        <Text style={styles.text}>• Chain-of-custody audit trail for prosecution readiness</Text>
      </AppCard>

      <AppCard>
        <Text style={styles.title}>Safe Location Finder</Text>
        {safeLocations.map((location) => (
          <Text key={location.name} style={styles.text}>• {location.name} • {location.kind} • {location.open}</Text>
        ))}
      </AppCard>

      <AppCard>
        <Text style={styles.title}>Life-Saving Broadcasts</Text>
        <Text style={styles.text}>🩸 Blood emergency broadcast: {featureToggles.bloodEmergencyBroadcast ? 'Enabled' : 'Disabled'}</Text>
        <Text style={styles.text}>👶 Child emergency mode: {featureToggles.childEmergencyMode ? 'Enabled' : 'Disabled'}</Text>
        <Text style={styles.text}>🚑 Hospital and ambulance auto-notify</Text>
      </AppCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 30 },
  title: { color: colors.text, fontWeight: '700', marginBottom: 8 },
  text: { color: colors.muted, marginBottom: 6 },
  hint: { color: colors.warning, marginTop: 8 },
  action: { color: colors.primary, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 }
});
