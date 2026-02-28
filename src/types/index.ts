export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type SOSPayload = {
  incidentType: string;
  location: GeoPoint;
  timestamp: string;
  batteryLevel?: number | null;
  networkStatus: string;
  evidenceIds: string[];
  discreet: boolean;
};

export type Agency = {
  id: string;
  name: string;
  type: 'Police' | 'NSCDC' | 'Vigilante' | 'Hospital' | 'FRSC';
  location: GeoPoint;
  phone: string;
  radiusKm: number;
  status: 'Received' | 'Responding' | 'Resolved';
};

export type HeatZone = {
  id: string;
  center: GeoPoint;
  severity: 'active' | 'recent' | 'past' | 'safe';
  incidents: number;
};
