# NOEMA Signal Sandbox - Synthetic Biosignal Generation Rules

## Overview
This document describes the computational rules for generating synthetic illustrative biosignals in the NOEMA Signal Sandbox. 

**IMPORTANT DISCLAIMER**: This simulator generates synthetic educational signals loosely inspired by common patterns observed in EEG and physiological research. It does NOT model a real human brain, does NOT produce medical-grade data, and should NOT be used for diagnostic purposes. All signals are probabilistic approximations designed for educational exploration and prototyping.

The simulation uses multi-band mixture models where signals contain weighted components across multiple frequency bands, reflecting the reality that brain activity is never a single pure frequency.

---

## 1. MULTI-BAND MIXTURE MODEL

### 1.1 Frequency Band Definitions
All signals are generated as weighted mixtures of multiple frequency bands:

| Band | Frequency Range | Common Associations (not deterministic) |
|------|----------------|----------------------------------------|
| **Delta** | 1–4 Hz | Deep sleep, unconscious processes |
| **Theta** | 4–8 Hz | Drowsiness, meditation, memory processing |
| **Alpha** | 8–12 Hz | Relaxed wakefulness, eyes closed, internal focus |
| **Beta** | 13–30 Hz | Active thinking, concentration, arousal |
| **Gamma-like** | 30–45 Hz | High cognitive load, sensory binding |

### 1.2 State-Based Band Power Modulation
Rather than mapping states to single frequencies, each state biases the relative power across all bands:

| State | Delta | Theta | Alpha | Beta | Gamma-like | Characteristics |
|-------|-------|-------|-------|------|------------|----------------|
| **Calm** | Low | Moderate | **High** | Low | Minimal | Stable, alpha-dominant |
| **Focused** | Minimal | Low | Moderate | **High** | Moderate | Beta-dominant, stable |
| **Stressed** | Low | Moderate | Low | **High** | High | High variability, noisy |
| **Fatigued** | Moderate | **High** | Moderate | Low | Minimal | Slow drift, unstable |
| **Urgent** | Low | Low | Low | High | **High** | Burst-like, high arousal |
| **Neutral** | Balanced | Balanced | Balanced | Balanced | Balanced | Mixed baseline |

**Note**: These are probabilistic tendencies, not deterministic rules. Real brain activity shows high inter-individual and moment-to-moment variability.

---

## 2. CHANNEL-SPECIFIC SIGNAL GENERATION

Each channel represents approximate regional biases, not precise electrode placements.

### 2.1 Frontal Channel
**Approximate Region**: Prefrontal areas  
**Biased Toward**: Executive function, decision load, stress modulation

#### Modulation Tendencies:

**Cognitive Intent Effects** (subtle modulation only):
- **"Yes"**: May increase frontal consistency, slight beta stabilization
  - *Rationale*: Confirmation decisions may show more stable frontal patterns
- **"No"**: May show brief inhibitory transient, slight suppression pulse
  - *Rationale*: Inhibitory control may create distinct transient patterns
- **"Help"**: May increase urgency-related bursts, elevated beta/gamma-like activity
  - *Rationale*: Distress states often correlate with increased frontal arousal

**Emotional State Effects**:
- **Stressed**: Increased beta/gamma-like power, higher variability
- **Calm**: Increased alpha, reduced high-frequency noise
- **Focused**: Elevated sustained beta, improved stability

**Artifacts**:
- **Blink**: Strong frontal transient spike (150-300ms duration)

---

### 2.2 Motor Channel
**Approximate Region**: Motor cortex areas  
**Biased Toward**: Movement imagery, motor planning

#### Modulation Tendencies:

**Cognitive Intent Effects**:
- **"Left"**: May bias right motor modulation (contralateral tendency)
- **"Right"**: May bias left motor modulation (contralateral tendency)
  - *Note*: These are illustrative approximations of motor imagery lateralization

**Artifacts**:
- **Jaw Clench**: Broadband high-frequency EMG burst (strongest contamination)

---

### 2.3 Temporal Channel
**Approximate Region**: Temporal lobe areas  
**Biased Toward**: Auditory imagery, internal speech

#### Modulation Tendencies:

**Cognitive Intent Effects**:
- **"Help"**: May show increased activity related to internal speech/distress vocalization

**Artifacts**:
- **Jaw Clench**: Moderate EMG spillover

---

### 2.4 Occipital Channel
**Approximate Region**: Visual cortex areas  
**Biased Toward**: Visual processing, strongest alpha modulation

#### Modulation Tendencies:

**Eye State Effects**:
- **Eyes Closed**: Strong alpha power increase (most robust effect in simulation)
  - *Rationale*: Posterior alpha blocking reversal is one of the most reliable EEG phenomena
- **Eyes Open**: Reduced alpha, increased sensory vigilance

---

### 2.5 Physiological Channel
**Systems**: Autonomic arousal, pulse-like rhythms  
**Biased Toward**: Arousal state, stress response

#### Modulation Tendencies:

**Emotional State Effects**:
- **Stressed**: Increased variability, elevated high-frequency components
- **Calm**: Reduced amplitude, stable slow rhythms
- **Urgent**: High arousal bursts, increased pulse-like activity

---

## 3. ANALYTICS CALCULATIONS

### 3.1 Stress Index (0-1 scale)

**Computed From**:
- Signal variability (higher variance → higher stress)
- Beta/gamma-like band power proportion
- Physiological arousal indicators
- Artifact load (EMG contamination)
- Emotional state bias

**Interpretation**: Approximate indicator of arousal/stress tendency in the synthetic signal, not a medical stress measurement.

---

### 3.2 Focus Metrics (Split into Two Types)

#### Internal Focus (0-1 scale)
**Optimized For**: Internal attention, mental calculation, meditation, memory tasks

**Modulation**:
- **Eyes Closed**: +15% (reduces external distraction)
- **Eyes Open**: Baseline
- **Focused State**: High
- **Calm State**: Moderate-High
- **Stressed/Fatigued**: Low

#### External Vigilance (0-1 scale)
**Optimized For**: Environmental monitoring, visual tasks, external attention

**Modulation**:
- **Eyes Open**: +15% (better sensory input)
- **Eyes Closed**: -20% (reduced external awareness)
- **Focused State**: High
- **Urgent State**: Moderate-High
- **Fatigued**: Low

**Rationale**: Splitting focus into internal vs external better reflects the reality that eyes-closed enhances some cognitive tasks while impairing others.

---

### 3.3 Signal Stability (0-1 scale)

**Computed From**:
- Inverse of signal variance
- Artifact rate
- State consistency

**Interpretation**: Higher stability suggests more consistent signal patterns, lower suggests transitions or artifacts.

---

### 3.4 Intent Confidence (0-1 scale)

**Computed From**:
- Signal quality (SNR approximation)
- State clarity (focused/calm vs stressed/fatigued)
- Scenario specificity (neutral has low confidence)

**Interpretation**: Synthetic estimate of how "clear" the simulated intent pattern might be, not actual BCI classification accuracy.

---

### 3.5 Alpha/Beta Ratio

**Computed From**:
- Estimated alpha band power / estimated beta band power
- Modulated by state and eye condition

**Interpretation**: 
- High ratio (>1.5): Alpha-dominant, relaxed, internally focused
- Balanced (0.8-1.5): Mixed activity
- Low ratio (<0.8): Beta-dominant, alert, cognitively engaged

**Eye State Effect**:
- Eyes Closed: Ratio increases significantly (alpha boost)
- Eyes Open: Ratio decreases (alpha suppression)

---

## 4. ARTIFACTS & TRANSIENT EVENTS

### 4.1 Eye Blink Artifact
- **Duration**: 200ms
- **Amplitude**: 3× baseline
- **Decay**: Exponential (e^(-20t))
- **Affected Channels**: Primarily frontal

**Neuroscience Basis**: Blinks create large voltage deflections in frontal electrodes due to corneoretinal potential changes.

### 4.2 Jaw Clench Artifact (EMG)
- **Duration**: 500ms
- **Frequency**: 80 Hz
- **Amplitude**: 4× baseline
- **Decay**: Exponential (e^(-5t))
- **Affected Channels**: Motor, temporal

**Neuroscience Basis**: Muscle activity generates high-frequency EMG signals that contaminate EEG, especially near temporal and motor regions.

---

## 5. NOISE MODELING

**Noise Formula**:
```
noise = (noiseLevel / 100) × random(-1, 1) × 2
```

**Neuroscience Basis**: Real EEG contains:
- Electrical noise (50/60 Hz line noise)
- Muscle artifacts (EMG)
- Movement artifacts
- Electrode impedance variations
- Environmental interference

---

## 6. KEY NEUROSCIENCE REFERENCES

1. **Alpha Rhythm & Eyes Closed**: Berger, H. (1929). "Über das Elektrenkephalogramm des Menschen"
2. **Beta Activity & Cognition**: Engel & Fries (2010). "Beta-band oscillations—signalling the status quo?"
3. **Theta & Fatigue**: Klimesch (1999). "EEG alpha and theta oscillations reflect cognitive and memory performance"
4. **Gamma & Attention**: Fries (2009). "Neuronal gamma-band synchronization as a fundamental process in cortical computation"
5. **Motor Imagery**: Pfurtscheller & Neuper (1997). "Motor imagery activates primary sensorimotor area in humans"
6. **Stress & HRV**: Thayer et al. (2012). "A meta-analysis of heart rate variability and neuroimaging studies"

---

## 7. IMPLEMENTATION IMPROVEMENTS

### Improvement #1: Multi-Band Mixture Model ✓
Replace single-frequency-per-state with weighted band mixtures for all states.

### Improvement #2: Split Focus Metrics ✓
Implement separate Internal Focus and External Vigilance metrics to properly handle eyes-open vs eyes-closed effects.

### Improvement #3: Add Occipital Channel ✓
Include occipital channel to properly demonstrate alpha blocking/enhancement with eye state.

### Improvement #4: Probabilistic Modulation ✓
Replace deterministic "X causes Y Hz" with probabilistic biasing across bands.

### Improvement #5: Enhanced Disclaimer ✓
Clearly communicate that this is synthetic illustrative data, not real EEG or medical output.

---

## 8. SUMMARY OF SIMULATION APPROACH

| Parameter | Modulation Tendency | Rationale |
|-----------|-------------------|-----------|
| Calm State | Increased alpha, reduced beta/gamma | Common relaxation pattern |
| Focused State | Increased beta, moderate gamma-like | Active cognition pattern |
| Stressed State | Increased beta/gamma, high variability | Arousal/anxiety pattern |
| Fatigued State | Increased theta, reduced beta | Drowsiness pattern |
| Eyes Closed | Strong alpha increase (occipital) | Alpha blocking reversal |
| Eyes Closed | Internal Focus +15%, External Vigilance -20% | Task-dependent attention |
| Blink | 150-300ms frontal transient | Ocular artifact |
| Jaw Clench | Broadband EMG burst | Muscle artifact |
| "Yes" Intent | Slight frontal consistency increase | Illustrative decision pattern |
| "Help" Intent | Urgency bursts, arousal increase | Illustrative distress pattern |
| Left/Right Intent | Contralateral motor bias | Illustrative motor imagery |

---

## 9. CRITICAL DISCLAIMERS

1. **Not Real EEG**: This simulator generates synthetic educational signals, not actual brain recordings
2. **Not Medical**: No diagnostic, therapeutic, or clinical validity
3. **Probabilistic**: All rules are tendencies, not deterministic mappings
4. **Simplified**: Real brain activity is far more complex, variable, and individual-specific
5. **Educational Purpose**: Designed for prototyping concepts and exploring signal patterns
6. **No Claims**: We make no claims about accuracy, realism, or applicability to real neuroscience research

---

## CONCLUSION

The refactored simulation uses multi-band mixture models, probabilistic state biasing, and split focus metrics to create more scientifically defensible synthetic biosignals. The approach is humble about its limitations while remaining useful for educational exploration and interface prototyping.
