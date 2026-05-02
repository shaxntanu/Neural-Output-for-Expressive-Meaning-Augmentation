<div align="center">
  <img src="media/diagrams/NOEMA Infographic.png" alt="NOEMA Infographic" width="800">
</div>

# NOEMA

A multimodal biosignal interface for silent intent communication and adaptive human augmentation.

---

## What NOEMA Is (And Isn't)

NOEMA is **not** a mind-reading device. Consumer-grade EEG cannot decode free thoughts or full sentences reliably.

Instead, NOEMA is a **practical multimodal biosignal system** that combines:
- **EEG** (electroencephalography) - brain electrical activity
- **EOG** (electrooculography) - eye movement and blinks
- **EMG** (electromyography) - jaw and facial muscle activity
- **PPG** (photoplethysmography) - heart rate and stress proxies
- **Adaptive AI** - personalized pattern recognition

By fusing multiple signal types, NOEMA aims to enable:
- **Silent binary commands** (Yes/No, Left/Right, Help)
- **Emotional state detection** (Calm, Stressed, Focused, Fatigued)
- **Assistive control** for accessibility applications
- **Stress-aware interfaces** that adapt to user state

---

## Why NOEMA Matters

### Accessibility
Silent communication for individuals with speech or motor impairments.

### Silent Control
Hands-free, voice-free interaction in sensitive environments (medical, tactical, noisy).

### Stress-Aware Interfaces
Systems that detect cognitive load and adapt accordingly.

### Human Augmentation Research
Exploring new sensory channels and feedback loops, inspired by cyborg pioneers like Neil Harbisson and Moon Ribas who demonstrated humans can learn entirely new senses through technology.

---

## Scientific Reality

### What Current Technology Can Do
- Detect binary intent (Yes/No) with calibration
- Recognize eye blinks and jaw clenches reliably
- Estimate stress/arousal from heart rate variability
- Classify 2-4 motor imagery states (Left/Right hand)

### What Current Technology Cannot Do
- Read arbitrary thoughts or inner speech
- Decode full sentences from EEG alone
- Work instantly without user-specific training
- Function reliably with heavy motion artifacts

### NOEMA's Approach
Focus on **symbolic intent** rather than linguistic decoding:
- Limited command vocabulary (4-8 states)
- Multimodal fusion (EEG + EMG + EOG + PPG)
- Personalized models per user
- Haptic/audio feedback for learning

---

## Research Foundation

NOEMA builds on established findings:

**Imagined Speech EEG**
- Promising in controlled lab settings
- Poor cross-subject generalization
- Requires extensive calibration
- Motion artifacts are problematic

**Multimodal Superiority**
- Hybrid EEG+EMG outperforms EEG-only
- Eye tracking adds robust control channel
- Physiological signals improve state detection

**Human Augmentation**
- Humans can learn new sensory mappings (Harbisson's color-to-sound)
- Vibrotactile feedback accelerates BCI learning
- Closed-loop systems enable sensory substitution

---

## System Architecture

```
┌─────────────────────────────────────────┐
│         INPUT LAYER                     │
│  EEG + EOG + EMG + PPG                  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      PREPROCESSING                      │
│  • Bandpass filtering                   │
│  • Artifact rejection                   │
│  • Normalization                        │
│  • Feature extraction                   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│    INFERENCE ENGINE                     │
│  • Personalized classifier              │
│  • Multimodal fusion                    │
│  • Confidence scoring                   │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         OUTPUT LAYER                    │
│  • OLED display                         │
│  • Phone app                            │
│  • Haptic feedback                      │
│  • BLE device control                   │
└─────────────────────────────────────────┘
```

**Edge/Cloud Split:**
- **ESP32**: Real-time acquisition + lightweight inference
- **PC/Mobile**: Model training + analytics + visualization

---

## Current Status

**Phase**: Early-stage research and prototyping

**Completed:**
- ✅ Web-based signal sandbox with neuroscience-grounded simulation
- ✅ Hardware simulation lab (Python + C++ + ESP32)
- ✅ Literature review and realistic scope definition
- ✅ Multimodal architecture design

**In Progress:**
- 🔄 Low-cost sensor stack selection
- 🔄 Binary intent prototype development
- 🔄 Personalized model training pipeline

**Planned:**
- 📋 Real biosignal data collection
- 📋 Wearable multimodal MVP
- 📋 Assistive application pilots
- 📋 Research publication

---

## Roadmap

**2026**: Simulator + synthetic data + architecture validation  
**2027**: Real sensors + binary command prototype  
**2028**: Wearable multimodal MVP + user studies  
**2029+**: Adaptive consumer/assistive system

---

## Design Philosophy

1. **Practical over speculative** - Focus on achievable goals
2. **Multimodal over EEG-only** - Hybrid signals outperform single modality
3. **Personalized over generic** - User-specific models are essential
4. **Measurable over assumed** - Data-driven validation

---

## Repository Structure

- `docs/` - Technical documentation and research notes
- `research/` - Literature review and hypotheses
- `hardware/` - Sensor designs and BOMs
- `hardware-simulation/` - Python/C++/ESP32 prototyping lab
- `firmware/` - Embedded code for microcontrollers
- `software/` - ML models and preprocessing pipelines
- `web-simulation/` - Browser-based signal sandbox
- `experiments/` - Experimental protocols and results
- `paper/` - Research paper drafts

---

## Confidentiality Note

Detailed implementation methods may remain private during active development.

---

**NOEMA**: Internal signals, external meaning.
