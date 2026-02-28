import { create } from 'zustand';
import { Agency, EmergencyContact, HeatZone, SOSPayload, SafetyFeatureToggle } from '@/types';

type State = {
  profile: {
    fullName: string;
    phone: string;
    bloodGroup: string;
    language: 'English' | 'Hausa' | 'Pidgin';
  };
  trustedCircle: EmergencyContact[];
  agencies: Agency[];
  heatZones: HeatZone[];
  sosHistory: SOSPayload[];
  offlineQueue: SOSPayload[];
  featureToggles: SafetyFeatureToggle;
  governorInsights: {
    avgResponseMin: number;
    highRiskAreas: string[];
    activeIncidents: number;
    verifiedToday: number;
  };
  addSOS: (payload: SOSPayload, offline?: boolean) => void;
  clearOfflineQueue: () => void;
  setFeatureToggle: <K extends keyof SafetyFeatureToggle>(name: K, value: SafetyFeatureToggle[K]) => void;
};

const agenciesSeed: Agency[] = [
  { id: '1', name: 'Minna Central Police', type: 'Police', phone: '08030000001', radiusKm: 25, status: 'Received', location: { latitude: 9.615, longitude: 6.556 } },
  { id: '2', name: 'Bosso NSCDC', type: 'NSCDC', phone: '08030000002', radiusKm: 20, status: 'Responding', location: { latitude: 9.64, longitude: 6.54 } },
  { id: '3', name: 'Ibrahim Badamasi Hospital', type: 'Hospital', phone: '08030000003', radiusKm: 30, status: 'Resolved', location: { latitude: 9.58, longitude: 6.53 } },
  { id: '4', name: 'Niger Fire Service Minna', type: 'Fire Service', phone: '08030000004', radiusKm: 18, status: 'Received', location: { latitude: 9.61, longitude: 6.57 } }
];

export const useNscStore = create<State>((set) => ({
  profile: {
    fullName: 'Citizen User',
    phone: '0801XXXXXXX',
    bloodGroup: 'O+',
    language: 'English'
  },
  trustedCircle: [
    { id: 'c1', name: 'Aisha Bala', phone: '0805XXXXXXX', relationship: 'Sister' },
    { id: 'c2', name: 'Musa Danjuma', phone: '0708XXXXXXX', relationship: 'Neighbor' }
  ],
  agencies: agenciesSeed,
  heatZones: [
    { id: 'h1', center: { latitude: 9.63, longitude: 6.55 }, severity: 'active', incidents: 9 },
    { id: 'h2', center: { latitude: 9.6, longitude: 6.5 }, severity: 'recent', incidents: 6 },
    { id: 'h3', center: { latitude: 9.58, longitude: 6.6 }, severity: 'past', incidents: 4 },
    { id: 'h4', center: { latitude: 9.55, longitude: 6.57 }, severity: 'safe', incidents: 1 }
  ],
  sosHistory: [],
  offlineQueue: [],
  featureToggles: {
    voiceSOS: true,
    childEmergencyMode: false,
    discreetLauncher: true,
    autoEvidenceUpload: true,
    travelGuardianAutoEscalate: true,
    bloodEmergencyBroadcast: true
  },
  governorInsights: {
    avgResponseMin: 8,
    highRiskAreas: ['Bosso', 'Kpakungu', 'Chanchaga'],
    activeIncidents: 4,
    verifiedToday: 13
  },
  addSOS: (payload, offline = false) =>
    set((state) => ({
      sosHistory: [payload, ...state.sosHistory],
      offlineQueue: offline ? [payload, ...state.offlineQueue] : state.offlineQueue
    })),
  clearOfflineQueue: () => set({ offlineQueue: [] }),
  setFeatureToggle: (name, value) =>
    set((state) => ({
      featureToggles: {
        ...state.featureToggles,
        [name]: value
      }
    }))
}));
