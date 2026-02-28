export const INCIDENT_TYPES = [
  'Bandit attack',
  'Kidnapping',
  'Theft',
  'Yan Dabba',
  'Fire',
  'Medical emergency',
  'Road accident',
  'Gender-based violence',
  'Missing person',
  'Suspicious activity',
  'Other'
] as const;

export type IncidentType = (typeof INCIDENT_TYPES)[number];
