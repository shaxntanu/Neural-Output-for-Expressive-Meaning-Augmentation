# NOEMA Data Flow Documentation

## Signal Generation to Command Detection Pipeline

### Phase 1: Python Signal Generation

```
User Input → SignalGenerator → Multi-band EEG Synthesis
                ↓
        State Modulation (calm/stressed/focused/fatigued)
                ↓
        Artifact Injection (blinks, jaw clenches)
                ↓
        Digital Filtering (bandpass, notch)
                ↓
        Output: 4-channel time-series data
```

### Phase 2: Data Export/Streaming

```
Generated Signals → CSV Export (datasets/synthetic/)
                 → Serial Stream (ESP32)
                 → Visualization (matplotlib)
```

### Phase 3: Embedded Processing

```
Serial Input → Parser → Rolling Window Buffer
                           ↓
                    Feature Extraction
                    (mean, variance, peak-to-peak, zero-crossings)
                           ↓
                    Pattern Detection
                    (blinks, jaw clenches, lateral asymmetry)
                           ↓
                    Command Classification
                    (YES, NO, LEFT, RIGHT, HELP, NONE)
                           ↓
                    Confidence Scoring
```

### Phase 4: Output & Display

```
Detected Command → OLED Display
                → LED Status
                → Serial Output
                → Bluetooth (future)
```

## Data Packet Structure

### Python to ESP32 Serial Packet
```
struct SignalPacket {
    float frontal;      // 4 bytes
    float motor;        // 4 bytes
    float temporal;     // 4 bytes
    float occipital;    // 4 bytes
};
Total: 16 bytes per packet
```

### CSV Export Format
```
timestamp,frontal,motor,temporal,occipital,event
0.000,45.2,32.1,38.5,55.3,none
0.004,46.1,31.8,39.2,54.8,none
...
```

## Timing Specifications

- **Sample Rate**: 250 Hz (4ms per sample)
- **Buffer Size**: 500 samples (2 seconds)
- **Classification Rate**: 2 Hz (every 0.5 seconds)
- **Display Update**: 10 Hz
- **Serial Baud Rate**: 115200 bps

## Memory Requirements

### Python
- Signal buffer: ~40 KB per 10-second recording
- Visualization: ~100 MB (matplotlib)

### ESP32
- Signal buffers: 8 KB (4 channels × 500 samples × 4 bytes)
- Code: ~64 KB flash
- Runtime: ~32 KB RAM

## Future Hardware Integration

When transitioning to real sensors:

1. Replace Python signal generator with ADC input
2. Keep embedded-core logic unchanged
3. Add sensor-specific calibration
4. Implement real-time filtering on ESP32
