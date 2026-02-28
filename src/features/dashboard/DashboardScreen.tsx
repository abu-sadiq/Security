import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppCard } from '@/components/AppCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useNscStore } from '@/store/useNscStore';
import { colors } from '@/theme/colors';
import { getPredictiveRiskSummary } from '@/services/riskService';

export const DashboardScreen = () => {
  const { governorInsights, offlineQueue, sosHistory } = useNscStore();
  const risk = getPredictiveRiskSummary();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="Niger Secure Command" />
      <Text style={styles.subtitle}>Minna Pilot • Citizen Safety App</Text>

      <AppCard>
        <Text style={styles.cardTitle}>Predictive Risk Alert</Text>
        <Text style={styles.cardBody}>{risk.message}</Text>
        {risk.recommendations.map((r) => (
          <Text key={r} style={styles.tag}>• {r}</Text>
        ))}
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>Rapid Response Metrics</Text>
        <View style={styles.row}><Text style={styles.metric}>Avg response:</Text><Text style={styles.metricValue}>{governorInsights.avgResponseMin} min</Text></View>
        <View style={styles.row}><Text style={styles.metric}>Queued offline SOS:</Text><Text style={styles.metricValue}>{offlineQueue.length}</Text></View>
        <View style={styles.row}><Text style={styles.metric}>Total incidents sent:</Text><Text style={styles.metricValue}>{sosHistory.length}</Text></View>
      </AppCard>

      <AppCard>
        <Text style={styles.cardTitle}>High-Risk Areas</Text>
        {governorInsights.highRiskAreas.map((a) => <Text key={a} style={styles.tag}>⚠️ {a}</Text>)}
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
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  metric: { color: colors.muted },
  metricValue: { color: colors.success, fontWeight: '700' }
});
