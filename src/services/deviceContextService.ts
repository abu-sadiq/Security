import * as Battery from 'expo-battery';
import * as Location from 'expo-location';
import * as Network from 'expo-network';

export const getDeviceEmergencyContext = async () => {
  const [battery, networkState] = await Promise.all([
    Battery.getBatteryLevelAsync().catch(() => null),
    Network.getNetworkStateAsync().catch(() => null)
  ]);

  const locationPermission = await Location.requestForegroundPermissionsAsync();
  const location = locationPermission.status === 'granted'
    ? await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
    : null;

  return {
    batteryLevel: battery,
    networkStatus: networkState?.isConnected ? 'online' as const : 'offline' as const,
    location: location
      ? { latitude: location.coords.latitude, longitude: location.coords.longitude }
      : { latitude: 9.6139, longitude: 6.5569 }
  };
};
