export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type IncidentVerificationStatus = 'verified' | 'unconfirmed' | 'false';

export type IncidentType =
  | 'Bandit attack'
  | 'Kidnapping'
  | 'Theft'
  | 'Yan Dabba'
  | 'Fire'
  | 'Medical emergency'
  | 'Road accident'
  | 'Missing person'
  | 'Gender-based violence'
  | 'Suspicious activity'
  | 'Other';

export type SOSPayload = {
  incidentType: IncidentType;
  location: GeoPoint;
  timestamp: string;
  batteryLevel?: number | null;
  networkStatus: 'online' | 'offline';
  evidenceIds: string[];
  discreet: boolean;
  voiceTriggered?: boolean;
};

export type AgencyStatus = 'Received' | 'Responding' | 'Resolved';

export type Agency = {
  id: string;
  name: string;
  type: 'Police' | 'NSCDC' | 'Vigilante' | 'Hospital' | 'FRSC' | 'Fire Service';
  location: GeoPoint;
  phone: string;
  radiusKm: number;
  status: AgencyStatus;
};

export type HeatZone = {
  id: string;
  center: GeoPoint;
  severity: 'active' | 'recent' | 'past' | 'safe';
  incidents: number;
};

export type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
  relationship: string;
};

export type SafetyFeatureToggle = {
  voiceSOS: boolean;
  childEmergencyMode: boolean;
  discreetLauncher: boolean;
  autoEvidenceUpload: boolean;
  travelGuardianAutoEscalate: boolean;
  bloodEmergencyBroadcast: boolean;
};
