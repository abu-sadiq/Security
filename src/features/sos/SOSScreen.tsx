import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { INCIDENT_TYPES, IncidentType } from '@/constants/incidents';
import { colors } from '@/theme/colors';
import { getDeviceEmergencyContext } from '@/services/deviceContextService';
import { sendSMSFallback, sendSOSAlert } from '@/services/alertService';
import { useNscStore } from '@/store/useNscStore';

export const SOSScreen = () => {
  const [incidentType, setIncidentType] = useState<IncidentType>('Bandit attack');
  const [discreetMode, setDiscreetMode] = useState(false);
  const [status, setStatus] = useState('Standby');
  const addSOS = useNscStore((s) => s.addSOS);

  const triggerSOS = async () => {
    setStatus('Collecting context...');
    const context = await getDeviceEmergencyContext();
    const payload = {
      incidentType,
      location: context.location,
      timestamp: new Date().toISOString(),
      batteryLevel: context.batteryLevel,
      networkStatus: context.networkStatus,
      evidenceIds: [],
      discreet: discreetMode
    };

    try {
      if (context.networkStatus === 'offline') {
        await sendSMSFallback(payload);
        addSOS(payload, true);
        setStatus('Offline: SMS fallback queued.');
      } else {
        await sendSOSAlert(payload);
        addSOS(payload);
        setStatus('SOS delivered to nearest agencies.');
      }
      Alert.alert('SOS Sent', 'Emergency teams and your safety circle have been notified.');
    } catch {
      addSOS(payload, true);
      setStatus('Dispatch failed; saved for automatic retry.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>One-Tap Emergency SOS</Text>
      <Text style={styles.label}>Incident Type</Text>
      <View style={styles.chips}>
        {INCIDENT_TYPES.map((type) => (
          <Pressable key={type} onPress={() => setIncidentType(type)} style={[styles.chip, incidentType === type && styles.chipActive]}>
            <Text style={styles.chipText}>{type}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={() => setDiscreetMode((p) => !p)} style={styles.toggle}>
        <Text style={styles.toggleText}>Discreet mode: {discreetMode ? 'ON' : 'OFF'}</Text>
      </Pressable>

      <Pressable onLongPress={triggerSOS} delayLongPress={1200} style={styles.sosButton}>
        <Text style={styles.sosText}>HOLD TO SEND SOS</Text>
      </Pressable>
      <Text style={styles.hint}>Long-press for 1.2s to prevent accidental activation.</Text>
      <Text style={styles.status}>Status: {status}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16 },
  title: { color: colors.text, fontWeight: '700', fontSize: 20, marginBottom: 16 },
  label: { color: colors.muted, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 10, paddingVertical: 7, borderRadius: 999, borderWidth: 1, borderColor: '#2b4065' },
  chipActive: { backgroundColor: '#1b355f' },
  chipText: { color: colors.text, fontSize: 12 },
  toggle: { backgroundColor: colors.card, borderRadius: 10, padding: 12, marginBottom: 16 },
  toggleText: { color: colors.warning },
  sosButton: { backgroundColor: colors.danger, height: 170, borderRadius: 85, alignItems: 'center', justifyContent: 'center' },
  sosText: { color: 'white', fontSize: 20, fontWeight: '900' },
  hint: { color: colors.muted, marginTop: 10 },
  status: { color: colors.success, marginTop: 12, fontWeight: '700' }
});
