# Niger Secure Command (NSC) - Citizen App (React Native)

Production-grade **Android-first citizen application** for emergency response and safety intelligence in Nigeria, piloted in Minna metropolis.

## What is included

This repository provides complete source code for a high-capability citizen app with:

- One-tap SOS with long-press protection and incident classification.
- Automatic device context capture (GPS, time, battery, network state).
- Online API dispatch + offline SMS fallback + queued retry.
- Live security heat map UI for incident awareness.
- Nearest responder matching (police, NSCDC, vigilante, hospitals).
- Safety Circle / Travel Guardian experiences.
- Discreet mode and life-saving control toggles.
- Predictive risk alert cards and governor-level KPI summaries.
- Scalable architecture notes for handling 1M+ active users.

## Quick start

```bash
npm install
npm run start
npm run android
```

## App structure

```text
app/
  _layout.tsx
  index.tsx
src/
  components/
  constants/
  features/
    dashboard/
    sos/
    heatmap/
    operations/
    profile/
  navigation/
  services/
  store/
  theme/
  types/
```

## Enterprise-scale architecture (1M+ users)

To run NSC at state/national scale, pair this client with:

1. **API Gateway + regional edge POPs** for low latency.
2. **Auth service** (device + citizen identity with adaptive risk checks).
3. **Incident ingestion service** writing to durable queue (Kafka/SQS/PubSub).
4. **Real-time dispatch engine** routing to nearest agencies by geofence.
5. **SMS/USSD fallback gateway** for low-connectivity local government areas.
6. **Geo-intelligence pipeline** for hotspot and risk-time forecasting.
7. **Evidence vault** with KMS encryption, immutable chain of custody.
8. **Ops analytics warehouse** for governor command-center insights.
9. **Observability stack** (distributed tracing, SIEM, anomaly detection).
10. **Data governance** aligned with NDPA and emergency response protocols.

## Nigeria-focused enhancement backlog

- USSD panic command integration for feature phones.
- Multi-language support: English, Hausa, Nupe, Yoruba, Igbo, Pidgin.
- Community volunteer validation network.
- Mass incident broadcast across radio/TV emergency channels.
- Integration with NIN-based identity verification (policy-controlled).
- Drone/CCTV ingest into command center.
- Traffic-aware ambulance dispatch using FRSC feeds.

---

Built to save lives, reduce response time, and improve trust in public safety systems.
