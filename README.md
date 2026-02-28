# Niger Secure Command (NSC) - Citizen App (Expo SDK 54)

Android-first emergency response and safety intelligence application for Minna metropolis pilot, designed for Nigeria-wide scale.

## Expo/Node compatibility target

This codebase is aligned to **Expo SDK 54** and modern React Native.

- Expo: `~54.0.0`
- React Native: `0.81.0`
- React: `19.1.0`
- Recommended Node for Expo workflows: **Node 20 LTS**

> Node 24 can work for some tooling, but Node 20 LTS remains safer for Expo CLI stability.

## Citizen features covered

- One-tap SOS with long-press safety guard
- Multi-channel delivery (API + offline SMS fallback queue)
- Auto-capture of GPS, battery level, network state and timestamp
- Discreet mode toggle and voice SOS command phrase
- Nearest security agency matching (Police, NSCDC, Hospital, Fire Service)
- Security heat map with active/recent/past/safe zones
- Community Safety Circle and group escalation model
- Travel Guardian behaviors (safe route, geofence check-ins, auto escalation)
- Evidence and verification concepts (verified / unconfirmed / false)
- Blood emergency and child emergency mode controls
- Safe location finder (police, hospital, secure transit points)
- Governor/command-center metrics and risk snapshots

## Project structure

```text
app/
  _layout.tsx
  index.tsx
src/
  components/
  constants/
  features/
    alerts/
    dashboard/
    heatmap/
    operations/
    profile/
    sos/
  navigation/
  services/
  store/
  theme/
  types/
```

## Run locally

```bash
npm install
npm run start
npm run android
```

## Scale strategy for 1M+ users

- Edge API gateway + georegional routing
- Event-driven incident ingestion queues
- SMS/USSD fallback for low-connectivity zones
- Immutable evidence vault and audit chain
- Risk-model pipeline with false-report defenses
- Governor command-center analytics and SLA monitoring
