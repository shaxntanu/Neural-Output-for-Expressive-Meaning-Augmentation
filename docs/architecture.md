# NOEMA System Architecture v2.0

## Overview

NOEMA is a multimodal biosignal interface with edge/cloud hybrid processing architecture.

---

## System Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     INPUT LAYER                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                   │
│  │ EEG  │  │ EOG  │  │ EMG  │  │ PPG  │                   │
│  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘                   │
└─────┼─────────┼─────────┼─────────┼───────────────────────┘
      │         │         │         │
      └─────────┴─────────┴─────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              PREPROCESSING LAYER                            │
│  ┌────────────────────────────────────────────────────┐    │
│  │  • Bandpass filtering (0.5-50 Hz)                  │    │
│  │  • Notch filter (50/60 Hz power line)              │    │
│  │  • Artifact rejection (blink, motion, muscle)      │    │
│  │  • Normalization (z-score, min-max)                │    │
│  │  • Windowing (1-2 second epochs)                   │    │
│  │  • Feature extraction (PSD, CSP, wavelet)          │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              INFERENCE ENGINE                               │
│  ┌────────────────────────────────────────────────────┐    │
│  │  Multimodal Fusion                                 │    │
│  │  ├─ EEG features → Intent classifier               │    │
│  │  ├─ EMG features → Muscle activity detector        │    │
│  │  ├─ EOG features → Eye state tracker               │    │
│  │  └─ PPG features → Stress/arousal estimator        │    │
│  │                                                     │    │
│  │  Personalized Models                               │    │
│  │  ├─ User-specific calibration                      │    │
│  │  ├─ Adaptive learning                              │    │
│  │  └─ Transfer learning from population              │    │
│  │                                                     │    │
│  │  Confidence Scoring                                │    │
│  │  ├─ Cross-modal validation                         │    │
│  │  ├─ Temporal consistency                           │    │
│  │  └─ Threshold-based rejection                      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                OUTPUT LAYER                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  OLED    │  │  Phone   │  │  Haptic  │  │   BLE    │  │
│  │ Display  │  │   App    │  │ Feedback │  │ Control  │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Edge/Cloud Split

### ESP32 (Edge Device)
**Responsibilities:**
- Real-time signal acquisition (250-500 Hz sampling)
- Lightweight preprocessing (filtering, artifact detection)
- Feature extraction (PSD, time-domain features)
- Inference with TinyML models (<100KB)
- Haptic/visual feedback
- BLE communication

**Constraints:**
- Limited RAM (520 KB)
- Limited flash (4 MB)
- Battery-powered
- Real-time requirements (<100ms latency)

### PC/Mobile (Cloud/Companion)
**Responsibilities:**
- Model training and optimization
- Complex analytics and visualization
- Data logging and storage
- Model updates via BLE
- User interface and configuration
- Long-term adaptation

**Advantages:**
- Unlimited compute
- Large datasets
- Complex models (deep learning)
- Rich visualization

---

## Signal Processing Pipeline

### 1. Acquisition
```
EEG: 4-8 channels @ 250 Hz (Fp1, Fp2, C3, C4, O1, O2)
EOG: 2 channels @ 250 Hz (horizontal, vertical)
EMG: 2 channels @ 500 Hz (jaw, forehead)
PPG: 1 channel @ 100 Hz (finger/wrist)
```

### 2. Preprocessing
```python
# Bandpass filter
signal_filtered = butter_bandpass(signal, 0.5, 50, fs=250)

# Notch filter (power line)
signal_clean = notch_filter(signal_filtered, 50, fs=250)

# Artifact rejection
if detect_artifact(signal_clean):
    reject_epoch()

# Normalization
signal_norm = (signal_clean - mean) / std
```

### 3. Feature Extraction
```python
# Power Spectral Density
psd_features = welch(signal_norm, fs=250, nperseg=256)

# Common Spatial Patterns (for motor imagery)
csp_features = csp_transform(signal_norm, labels)

# Wavelet coefficients
wavelet_features = dwt(signal_norm, 'db4', level=4)

# Time-domain features
time_features = [mean, std, skewness, kurtosis]
```

### 4. Classification
```python
# Multimodal fusion
eeg_prob = eeg_classifier.predict_proba(eeg_features)
emg_prob = emg_classifier.predict_proba(emg_features)
eog_prob = eog_classifier.predict_proba(eog_features)
ppg_prob = ppg_classifier.predict_proba(ppg_features)

# Weighted fusion
final_prob = (
    0.4 * eeg_prob +
    0.3 * emg_prob +
    0.2 * eog_prob +
    0.1 * ppg_prob
)

# Confidence thresholding
if max(final_prob) > 0.75:
    command = argmax(final_prob)
else:
    command = REJECT
```

---

## Hardware Architecture

### Sensor Module
```
┌─────────────────────────────────────┐
│         Dry EEG Headband            │
│  • 4-8 channels                     │
│  • Adjustable fit                   │
│  • Conductive rubber electrodes     │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         EMG Patches                 │
│  • Jaw (masseter muscle)            │
│  • Forehead (frontalis)             │
│  • Adhesive gel electrodes          │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         EOG Electrodes              │
│  • Near eyes (horizontal/vertical)  │
│  • Integrated with headband         │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         PPG Sensor                  │
│  • Finger clip or wrist band        │
│  • Optical heart rate monitor       │
└─────────────────┬───────────────────┘
                  │
                  ▼
```

### Processing Module
```
┌─────────────────────────────────────┐
│         ESP32-S3                    │
│  • Dual-core 240 MHz                │
│  • 512 KB SRAM                      │
│  • WiFi + BLE 5.0                   │
│  • 16-bit ADC                       │
│  • TinyML inference                 │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         Power Management            │
│  • LiPo battery (1000 mAh)          │
│  • USB-C charging                   │
│  • 4-6 hour runtime                 │
└─────────────────────────────────────┘
```

### Output Module
```
┌─────────────────────────────────────┐
│         OLED Display                │
│  • 128x64 pixels                    │
│  • Command feedback                 │
│  • Battery status                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         Haptic Motor                │
│  • Vibration patterns               │
│  • Confirmation feedback            │
│  • Training cues                    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         BLE Module                  │
│  • Phone app connection             │
│  • Model updates                    │
│  • Data logging                     │
└─────────────────────────────────────┘
```

---

## Software Architecture

### Embedded Firmware (C++)
```
noema_core/
├── acquisition/
│   ├── adc_driver.cpp
│   ├── eeg_sampler.cpp
│   ├── emg_sampler.cpp
│   └── ppg_sampler.cpp
├── preprocessing/
│   ├── filters.cpp
│   ├── artifact_detector.cpp
│   └── feature_extractor.cpp
├── inference/
│   ├── tinyml_model.cpp
│   ├── multimodal_fusion.cpp
│   └── confidence_scorer.cpp
├── output/
│   ├── display_driver.cpp
│   ├── haptic_driver.cpp
│   └── ble_comm.cpp
└── main.cpp
```

### Companion App (Python/React)
```
noema_app/
├── training/
│   ├── calibration.py
│   ├── model_trainer.py
│   └── transfer_learning.py
├── analytics/
│   ├── signal_viewer.py
│   ├── performance_metrics.py
│   └── data_logger.py
├── models/
│   ├── eeg_classifier.py
│   ├── emg_classifier.py
│   └── multimodal_fusion.py
└── ui/
    ├── dashboard.tsx
    ├── calibration_wizard.tsx
    └── settings.tsx
```

---

## Data Flow

### Real-Time Loop (Edge)
```
1. Sample sensors @ 250-500 Hz
2. Buffer 1-2 seconds of data
3. Apply filters and artifact rejection
4. Extract features
5. Run TinyML inference
6. Fuse multimodal predictions
7. Check confidence threshold
8. Output command or reject
9. Provide haptic feedback
10. Repeat
```

### Training Loop (Cloud)
```
1. Collect calibration data (5-10 minutes)
2. Label data with ground truth
3. Extract features from all modalities
4. Train personalized models
5. Optimize for edge deployment
6. Convert to TinyML format
7. Upload to ESP32 via BLE
8. Validate performance
9. Iterate if needed
```

### Adaptation Loop (Hybrid)
```
1. Log predictions and user corrections
2. Periodically retrain models (daily/weekly)
3. Use transfer learning for efficiency
4. Update edge models incrementally
5. Monitor performance drift
6. Trigger recalibration if accuracy drops
```

---

## Performance Targets

### Latency
- Sensor to decision: <100ms
- Haptic feedback: <150ms total
- BLE communication: <50ms

### Accuracy
- Binary classification: >85% after calibration
- 4-class classification: >70% after calibration
- Multimodal improvement: >15% vs EEG-only

### Power
- Active mode: <200mW
- Sleep mode: <10mW
- Battery life: 4-6 hours continuous use

### Robustness
- Motion artifact rejection: >90%
- Cross-session consistency: >80%
- Real-world deployment: >75% accuracy

---

## Security and Privacy

### On-Device Processing
- Raw signals never leave device
- Only features/predictions transmitted
- No cloud storage of biosignals

### Data Encryption
- BLE communication encrypted
- Local storage encrypted
- User data anonymized

### User Control
- Opt-in data collection
- Delete data anytime
- Export personal data

---

## Future Enhancements

### Hardware
- Smaller form factor
- Longer battery life
- More channels (16-32 EEG)
- Improved dry electrodes

### Software
- Online learning algorithms
- Federated learning across users
- More complex command vocabulary
- Context-aware adaptation

### Applications
- Accessibility tools
- Gaming interfaces
- Meditation feedback
- Stress management

---

**Version**: 2.0  
**Last Updated**: 2026-04-27  
**Status**: Active Development
