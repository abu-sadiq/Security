import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { SectionTitle } from '@/components/SectionTitle';
import { StatChip } from '@/components/StatChip';
import { useNscStore } from '@/store/useNscStore';
import { colors } from '@/theme/colors';
import { getPredictiveRiskSummary } from '@/services/riskService';

export const DashboardScreen = () => {
  const { governorInsights, offlineQueue, sosHistory } = useNscStore();
  const risk = getPredictiveRiskSummary();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="Niger Secure Command" />
      <Text style={styles.subtitle}>Minna Pilot • Citizen Safety App • SDK 54 ready</Text>

      <AppCard>
        <Text style={styles.cardTitle}>Predictive Risk Alert</Text>
        <Text style={styles.cardBody}>{risk.message}</Text>
        {risk.recommendations.map((item) => (
          <Text key={item} style={styles.tag}>• {item}</Text>
        ))}
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Command Center Snapshot</Text>
        <View style={styles.grid}>
          <StatChip label="Avg response" value={`${governorInsights.avgResponseMin} min`} />
          <StatChip label="Active incidents" value={governorInsights.activeIncidents} />
          <StatChip label="Verified today" value={governorInsights.verifiedToday} />
          <StatChip label="Offline queue" value={offlineQueue.length} />
          <StatChip label="Sent incidents" value={sosHistory.length} />
        </View>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>High-Risk Areas</Text>
        {governorInsights.highRiskAreas.map((area) => (
          <Text key={area} style={styles.tag}>⚠️ {area}</Text>
        ))}
      </AppCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 32 },
  subtitle: { color: colors.muted, marginBottom: 14 },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700', marginBottom: 8 },
  cardBody: { color: colors.text, marginBottom: 6 },
  tag: { color: colors.warning, marginBottom: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }
});
