import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '@/features/dashboard/DashboardScreen';
import { SOSScreen } from '@/features/sos/SOSScreen';
import { HeatMapScreen } from '@/features/heatmap/HeatMapScreen';
import { OperationsScreen } from '@/features/operations/OperationsScreen';
import { ProfileScreen } from '@/features/profile/ProfileScreen';
import { AlertsScreen } from '@/features/alerts/AlertsScreen';
import { colors } from '@/theme/colors';

const Tab = createBottomTabNavigator();

const mapIcon: Record<string, keyof typeof Ionicons.glyphMap> = {
  Dashboard: 'home-outline',
  SOS: 'warning-outline',
  HeatMap: 'map-outline',
  Alerts: 'notifications-outline',
  Operations: 'shield-checkmark-outline',
  Profile: 'person-outline'
};

export const RootNavigator = () => (
  <NavigationContainer
    theme={{
      ...DarkTheme,
      colors: { ...DarkTheme.colors, background: colors.bg, card: '#091a33', text: colors.text, primary: colors.primary }
    }}
  >
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#091a33' },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: '#091a33', borderTopColor: '#1b355f' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8ca5cb',
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ color, size }) => <Ionicons name={mapIcon[route.name]} size={size} color={color} />
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="SOS" component={SOSScreen} />
      <Tab.Screen name="HeatMap" component={HeatMapScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} />
      <Tab.Screen name="Operations" component={OperationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);
