# Hardware Simulation Architecture

## System Overview

The NOEMA hardware simulation environment consists of three interconnected modules that work together to simulate the complete signal processing pipeline from biosignal acquisition to command output.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    PYTHON SIGNAL LAB                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Signal     │→ │   Filters    │→ │  Visualizer  │         │
│  │  Generator   │  │  (Bandpass)  │  │  (Plotting)  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         ↓                                                        │
│  ┌──────────────────────────────────────────────────┐          │
│  │  Command Pattern Injection (Blinks, Jaw, Intent) │          │
│  └──────────────────────────────────────────────────┘          │
└────────────────────────────┬────────────────────────────────────┘
                             │ Serial/CSV
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    EMBEDDED CORE (C++)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Parser     │→ │   Rolling    │→ │   Feature    │         │
│  │  (Buffering) │  │   Window     │  │  Extractor   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                              ↓                   │
│                                    ┌──────────────┐             │
│                                    │  Classifier  │             │
│                                    │  (Commands)  │             │
│                                    └──────────────┘             │
└────────────────────────────┬────────────────────────────────────┘
                             │ Commands
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    ESP32 FIRMWARE                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Serial     │→ │  Embedded    │→ │    OLED      │         │
│  │   Input      │  │    Core      │  │   Display    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│                                              ↓                   │
│                                    ┌──────────────┐             │
│                                    │  LED Status  │             │
│                                    │  Bluetooth   │             │
│                                    └──────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## Module Responsibilities

### 1. Python Signal Lab

**Purpose**: Generate realistic synthetic biosignals for algorithm development

**Components**:
- **SignalGenerator**: Multi-band EEG synthesis (Delta, Theta, Alpha, Beta, Gamma)
- **Filters**: Digital signal processing (bandpass, notch, smoothing)
- **CommandPatterns**: Intent pattern injection (left, right, yes, no, help)
- **Visualizer**: Real-time plotting and analysis
- **Main**: CLI interface and orchestration

**Outputs**:
- CSV files with timestamped multi-channel data
- Real-time serial stream to ESP32
- Matplotlib visualizations
- Event logs

### 2. Embedded Core (C++)

**Purpose**: Hardware-independent signal processing and command detection

**Components**:
- **Parser**: Incoming signal parsing and validation
- **RollingWindow**: Circular buffer for temporal analysis
- **FeatureExtractor**: Statistical and frequency-domain features
- **Classifier**: Pattern recognition and command detection

**Design Principles**:
- No external dependencies (pure C++)
- Fixed-point arithmetic compatible
- Memory-efficient (suitable for microcontrollers)
- Modular and testable

**Outputs**:
- Command enums (YES, NO, LEFT, RIGHT, HELP, NONE)
- Confidence scores
- Debug information

### 3. ESP32 Firmware

**Purpose**: Hardware integration and peripheral management

**Components**:
- **SerialInput**: UART communication with Python or sensors
- **Display**: OLED screen driver (SSD1306)
- **LEDStatus**: Visual feedback system
- **Config**: Hardware pin definitions and settings

**Features**:
- Real-time command display
- Battery status monitoring (placeholder)
- Bluetooth communication (placeholder)
- WiFi telemetry (future)

## Data Flow

### Signal Generation Flow

```
1. User selects mode (calm, stressed, focused, etc.)
2. SignalGenerator creates base multi-band EEG
3. State modulation applied (alpha/beta ratios)
4. Artifacts injected (blinks, jaw clenches)
5. Intent patterns embedded (if specified)
6. Filters applied (bandpass, notch)
7. Output to CSV/Serial/Plot
```

### Processing Flow

```
1. Parser receives raw signal samples
2. Samples added to RollingWindow buffer
3. FeatureExtractor computes:
   - Mean, variance, peak-to-peak
   - Zero-crossing rate
   - Spectral energy (approximation)
4. Classifier evaluates features against thresholds
5. Command detected and output
6. Confidence score calculated
```

### Firmware Flow

```
1. SerialInput reads data packets
2. Data passed to embedded-core
3. Command received from classifier
4. Display updated with command
5. LED status changed
6. Optional: Bluetooth transmission
```

## Signal Characteristics

### EEG Bands

| Band  | Frequency | Amplitude | State Association |
|-------|-----------|-----------|-------------------|
| Delta | 0.5-4 Hz  | 50-100 µV | Deep sleep, baseline |
| Theta | 4-8 Hz    | 20-50 µV  | Meditation, internal focus |
| Alpha | 8-13 Hz   | 30-70 µV  | Relaxed, eyes closed |
| Beta  | 13-30 Hz  | 10-30 µV  | Active thinking, stress |
| Gamma | 30-100 Hz | 5-15 µV   | High cognition |

### Artifacts

| Type | Amplitude | Duration | Pattern |
|------|-----------|----------|---------|
| Blink | 200-400 µV | 200-400 ms | Sharp spike |
| Jaw Clench | 100-300 µV | 500-2000 ms | Sustained burst |
| Movement | 50-150 µV | Variable | Random noise |

### Command Patterns

| Command | Pattern | Detection Rule |
|---------|---------|----------------|
| YES | Long jaw clench | Duration > 1.5s, Amplitude > 200µV |
| NO | Short jaw clench | Duration < 0.8s, Amplitude > 200µV |
| HELP | Double blink | Two spikes within 1s |
| LEFT | Left-side alpha suppression | Left < Right by 30% |
| RIGHT | Right-side alpha suppression | Right < Left by 30% |

## Hardware Mapping (Future)

### Current (Simulation)
```
Python → Serial → ESP32 → Commands
```

### Future (Real Hardware)
```
EEG Electrodes → ADS1299 ADC → ESP32 → Commands
EMG Electrodes → AD8232 → ESP32 → Commands
```

**Pin Mapping (ESP32)**:
- GPIO 21: I2C SDA (OLED)
- GPIO 22: I2C SCL (OLED)
- GPIO 2: Status LED
- GPIO 16: UART RX (Serial input)
- GPIO 17: UART TX (Serial output)
- GPIO 18: SPI CLK (Future ADC)
- GPIO 19: SPI MISO (Future ADC)
- GPIO 23: SPI MOSI (Future ADC)
- GPIO 5: SPI CS (Future ADC)

## Performance Targets

### Python Signal Lab
- Generation rate: 250 Hz (4ms per sample)
- Latency: < 10ms for real-time streaming
- Memory: < 100 MB for 1-hour session

### Embedded Core
- Processing time: < 5ms per sample
- Memory footprint: < 32 KB RAM
- Flash usage: < 64 KB

### ESP32 Firmware
- Command latency: < 100ms
- Display refresh: 10 Hz
- Power consumption: < 100 mA (target)

## Testing Strategy

### Unit Tests
- Signal generator output validation
- Filter frequency response
- Classifier accuracy on known patterns
- Parser robustness to malformed data

### Integration Tests
- Python → C++ data pipeline
- C++ → ESP32 serial communication
- End-to-end command detection

### Validation Tests
- Compare synthetic signals to literature
- Measure false positive/negative rates
- Stress test with noise and artifacts

## Future Enhancements

1. **Machine Learning Integration**
   - Replace rule-based classifier with trained model
   - Online learning for user adaptation
   - Transfer learning from synthetic to real data

2. **Advanced Signal Processing**
   - Wavelet transforms
   - Independent Component Analysis (ICA)
   - Adaptive filtering

3. **Multi-Modal Fusion**
   - Combine EEG + EMG + ECG
   - Sensor fusion algorithms
   - Confidence weighting

4. **Cloud Integration**
   - WiFi telemetry
   - Remote monitoring
   - Data logging and analysis

---

**Document Version**: 1.0  
**Last Updated**: 2026-04-25  
**Author**: NOEMA Team
