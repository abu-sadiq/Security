import { create } from 'zustand';
import { Agency, HeatZone, SOSPayload } from '@/types';

type State = {
  profile: {
    fullName: string;
    phone: string;
    bloodGroup: string;
    emergencyContact: string;
  };
  trustedCircle: Array<{ id: string; name: string; phone: string }>;
  agencies: Agency[];
  heatZones: HeatZone[];
  sosHistory: SOSPayload[];
  offlineQueue: SOSPayload[];
  governorInsights: {
    avgResponseMin: number;
    highRiskAreas: string[];
  };
  addSOS: (payload: SOSPayload, offline?: boolean) => void;
  clearOfflineQueue: () => void;
};

const agenciesSeed: Agency[] = [
  { id: '1', name: 'Minna Central Police', type: 'Police', phone: '08030000001', radiusKm: 25, status: 'Received', location: { latitude: 9.615, longitude: 6.556 } },
  { id: '2', name: 'Bosso NSCDC', type: 'NSCDC', phone: '08030000002', radiusKm: 20, status: 'Responding', location: { latitude: 9.64, longitude: 6.54 } },
  { id: '3', name: 'Ibrahim Badamasi Hospital', type: 'Hospital', phone: '08030000003', radiusKm: 30, status: 'Resolved', location: { latitude: 9.58, longitude: 6.53 } }
];

export const useNscStore = create<State>((set) => ({
  profile: {
    fullName: 'Citizen User',
    phone: '0801XXXXXXX',
    bloodGroup: 'O+',
    emergencyContact: '0802XXXXXXX'
  },
  trustedCircle: [
    { id: 'c1', name: 'Aisha Bala', phone: '0805XXXXXXX' },
    { id: 'c2', name: 'Musa Danjuma', phone: '0708XXXXXXX' }
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
  governorInsights: {
    avgResponseMin: 8,
    highRiskAreas: ['Bosso', 'Kpakungu', 'Chanchaga']
  },
  addSOS: (payload, offline = false) =>
    set((state) => ({
      sosHistory: [payload, ...state.sosHistory],
      offlineQueue: offline ? [payload, ...state.offlineQueue] : state.offlineQueue
    })),
  clearOfflineQueue: () => set({ offlineQueue: [] })
}));
