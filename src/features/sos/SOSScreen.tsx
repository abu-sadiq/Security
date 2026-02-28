import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { INCIDENT_TYPES } from '@/constants/incidents';
import { colors } from '@/theme/colors';
import { getDeviceEmergencyContext } from '@/services/deviceContextService';
import { sendSMSFallback, sendSOSAlert, verifyIncident } from '@/services/alertService';
import { useNscStore } from '@/store/useNscStore';
import { IncidentType } from '@/types';

export const SOSScreen = () => {
  const [incidentType, setIncidentType] = useState<IncidentType>('Bandit attack');
  const [discreetMode, setDiscreetMode] = useState(false);
  const [status, setStatus] = useState('Standby');
  const [voiceCommand, setVoiceCommand] = useState('');
  const addSOS = useNscStore((s) => s.addSOS);

  const triggerSOS = async (voiceTriggered = false) => {
    setStatus('Collecting context...');
    const context = await getDeviceEmergencyContext();
    const payload = {
      incidentType,
      location: context.location,
      timestamp: new Date().toISOString(),
      batteryLevel: context.batteryLevel,
      networkStatus: context.networkStatus,
      evidenceIds: [],
      discreet: discreetMode,
      voiceTriggered
    };

    try {
      if (context.networkStatus === 'offline') {
        await sendSMSFallback(payload);
        addSOS(payload, true);
        setStatus('Offline: SMS fallback queued.');
      } else {
        await sendSOSAlert(payload);
        addSOS(payload);
        const verification = await verifyIncident();
        setStatus(`SOS delivered (${verification.status}).`);
      }
      Alert.alert('SOS Sent', 'Emergency teams, hospitals, and your safety circle have been notified.');
    } catch {
      addSOS(payload, true);
      setStatus('Dispatch failed; saved for automatic retry.');
    }
  };

  const handleVoiceSOS = () => {
    if (voiceCommand.trim().toLowerCase() === 'nsc help me now') {
      triggerSOS(true);
      setVoiceCommand('');
      return;
    }

    Alert.alert('Voice SOS', 'Use the exact command: NSC HELP ME NOW');
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

      <Pressable onPress={() => setDiscreetMode((value) => !value)} style={styles.toggle}>
        <Text style={styles.toggleText}>Discreet mode: {discreetMode ? 'ON (Calculator disguise active)' : 'OFF'}</Text>
      </Pressable>

      <Pressable onLongPress={() => triggerSOS(false)} delayLongPress={1200} style={styles.sosButton}>
        <Text style={styles.sosText}>HOLD TO SEND SOS</Text>
      </Pressable>
      <Text style={styles.hint}>Long-press for 1.2s to prevent accidental activation.</Text>

      <View style={styles.voicePanel}>
        <Text style={styles.voiceTitle}>Voice SOS</Text>
        <TextInput
          value={voiceCommand}
          onChangeText={setVoiceCommand}
          placeholder="Say/type: NSC HELP ME NOW"
          placeholderTextColor="#6c84a8"
          style={styles.input}
        />
        <Pressable onPress={handleVoiceSOS} style={styles.voiceButton}>
          <Text style={styles.voiceButtonText}>Trigger Voice SOS</Text>
        </Pressable>
      </View>

      <Text style={styles.status}>Status: {status}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, paddingBottom: 28 },
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
  voicePanel: { backgroundColor: colors.card, borderRadius: 12, marginTop: 16, padding: 12 },
  voiceTitle: { color: colors.text, fontWeight: '700', marginBottom: 8 },
  input: { borderColor: '#2c4470', borderWidth: 1, borderRadius: 8, color: colors.text, paddingHorizontal: 10, paddingVertical: 8 },
  voiceButton: { marginTop: 10, backgroundColor: colors.primary, borderRadius: 8, paddingVertical: 10, alignItems: 'center' },
  voiceButtonText: { color: '#011422', fontWeight: '800' },
  status: { color: colors.success, marginTop: 14, fontWeight: '700' }
});
