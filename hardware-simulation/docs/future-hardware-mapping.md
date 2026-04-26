# Future Hardware Mapping

## Sensor Integration Roadmap

### Current State (Simulation)
```
Python Synthetic Signals → Serial → ESP32 → Commands
```

### Target State (Real Hardware)
```
EEG/EMG Sensors → ADC → ESP32 → Commands
```

## Recommended Hardware Components

### EEG Acquisition
- **ADS1299** (8-channel, 24-bit ADC)
  - Sample rate: up to 16 kHz
  - Input noise: 1 µVpp
  - Cost: ~$50-100
  - Interface: SPI

### EMG Acquisition
- **AD8232** (Single-lead ECG/EMG)
  - Integrated instrumentation amplifier
  - Cost: ~$5-10 per channel
  - Interface: Analog output to ESP32 ADC

### Electrodes
- **Dry EEG Electrodes**
  - Reusable, no gel required
  - Cost: ~$20-50 per set
  
- **Disposable Ag/AgCl Electrodes**
  - For EMG (jaw, blink detection)
  - Cost: ~$0.50 each

### Microcontroller
- **ESP32-WROOM-32**
  - Dual-core 240 MHz
  - 520 KB RAM
  - WiFi + Bluetooth
  - Cost: ~$5-10

### Display
- **SSD1306 OLED** (128x64)
  - I2C interface
  - Cost: ~$5

### Power
- **LiPo Battery** (1000-2000 mAh)
  - 3.7V nominal
  - Cost: ~$10-15

## Pin Mapping (ESP32)

### SPI (ADS1299)
- GPIO 18: SCK
- GPIO 19: MISO
- GPIO 23: MOSI
- GPIO 5: CS
- GPIO 4: DRDY (Data Ready)
- GPIO 15: RESET

### I2C (OLED)
- GPIO 21: SDA
- GPIO 22: SCL

### Analog (AD8232)
- GPIO 34: EMG Channel 1 (Jaw)
- GPIO 35: EMG Channel 2 (Blink)

### Digital I/O
- GPIO 2: Status LED
- GPIO 0: Button (Mode select)

### UART (Debug)
- GPIO 1: TX
- GPIO 3: RX

## Signal Chain

### EEG Path
```
Scalp Electrodes → ADS1299 (24-bit ADC) → SPI → ESP32
                                                    ↓
                                            Digital Filtering
                                                    ↓
                                            Feature Extraction
                                                    ↓
                                            Command Detection
```

### EMG Path
```
Surface Electrodes → AD8232 (Amplifier) → ESP32 ADC (12-bit)
                                                    ↓
                                            Envelope Detection
                                                    ↓
                                            Threshold Comparison
                                                    ↓
                                            Artifact Detection
```

## Calibration Procedure

1. **Baseline Recording** (30 seconds)
   - User relaxed, eyes open
   - Establish noise floor
   - Calculate channel means

2. **Eyes Closed Test** (10 seconds)
   - Verify alpha enhancement
   - Calibrate occipital channel

3. **Artifact Training** (5 repetitions each)
   - Blink detection threshold
   - Jaw clench threshold
   - Movement artifact rejection

4. **Intent Training** (10 repetitions each)
   - Left/right motor imagery
   - Yes/no confirmation patterns
   - Help signal

## Power Budget

| Component | Current (mA) | Notes |
|-----------|--------------|-------|
| ESP32 (active) | 80-160 | WiFi off |
| ADS1299 | 5 | Per channel |
| AD8232 (×2) | 0.5 | Per channel |
| OLED | 20 | Active display |
| **Total** | **~110 mA** | Typical |

**Battery Life**: 1000 mAh / 110 mA = ~9 hours

## Cost Estimate

| Item | Quantity | Unit Cost | Total |
|------|----------|-----------|-------|
| ESP32 | 1 | $8 | $8 |
| ADS1299 | 1 | $75 | $75 |
| AD8232 | 2 | $7 | $14 |
| Dry Electrodes | 4 | $10 | $40 |
| OLED Display | 1 | $5 | $5 |
| LiPo Battery | 1 | $12 | $12 |
| PCB + Components | 1 | $30 | $30 |
| **Total** | | | **~$184** |

## Development Timeline

1. **Phase 1** (Current): Simulation & Algorithm Development
2. **Phase 2** (Week 1-2): Breadboard prototype with AD8232
3. **Phase 3** (Week 3-4): ADS1299 integration
4. **Phase 4** (Week 5-6): PCB design and fabrication
5. **Phase 5** (Week 7-8): Enclosure and final assembly
6. **Phase 6** (Week 9-10): User testing and calibration

## Safety Considerations

- **Electrical Isolation**: Use isolated power supply for EEG
- **Current Limiting**: Protect against electrode faults
- **Medical Disclaimer**: Not for medical diagnosis
- **User Consent**: Inform users of experimental nature

## Regulatory Notes

This device is for **research and educational purposes only**. It is **not a medical device** and should not be used for clinical diagnosis or treatment.

For commercial deployment, consider:
- FDA 510(k) clearance (if medical claims)
- CE marking (Europe)
- FCC certification (RF emissions)
- ISO 13485 (Quality management)
