import { StyleSheet, Text, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { useNscStore } from '@/store/useNscStore';
import { colors } from '@/theme/colors';

const severityColor: Record<string, string> = {
  active: '#FF4B4B',
  recent: '#FF8C42',
  past: '#FFC857',
  safe: '#41D39C'
};

export const HeatMapScreen = () => {
  const zones = useNscStore((s) => s.heatZones);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{ latitude: 9.6139, longitude: 6.5569, latitudeDelta: 0.15, longitudeDelta: 0.15 }}
      >
        {zones.map((z) => (
          <Circle
            key={z.id}
            center={z.center}
            radius={600}
            fillColor={`${severityColor[z.severity]}55`}
            strokeColor={severityColor[z.severity]}
            strokeWidth={2}
          />
        ))}
        <Marker coordinate={{ latitude: 9.6139, longitude: 6.5569 }} title="Minna Center" />
      </MapView>
      <View style={styles.legend}>
        <Text style={styles.title}>Live Security Heat Map</Text>
        <Text style={styles.text}>🔴 Active • 🟠 Recent • 🟡 Past • 🟢 Safe</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#07162dE6',
    borderRadius: 12,
    padding: 12
  },
  title: { color: colors.text, fontWeight: '700', marginBottom: 4 },
  text: { color: colors.muted }
});
