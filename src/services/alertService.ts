import { SOSPayload } from '@/types';

const BASE_URL = 'https://api.nsc.ng/v1';

export const sendSOSAlert = async (payload: SOSPayload) => {
  const response = await fetch(`${BASE_URL}/sos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Unable to dispatch SOS');
  }

  return response.json();
};

export const sendSMSFallback = async (payload: SOSPayload, shortCode = '767') => {
  const locationLink = `https://maps.google.com/?q=${payload.location.latitude},${payload.location.longitude}`;
  return `SMS queued to ${shortCode}: ${payload.incidentType} at ${locationLink}`;
};
