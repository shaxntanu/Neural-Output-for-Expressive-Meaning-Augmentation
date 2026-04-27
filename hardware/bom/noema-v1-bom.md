# NOEMA v1 Bill of Materials (BOM)

## Estimated Total Cost: $150-200 USD

---

## Microcontroller & Core

| Component | Quantity | Unit Price | Total | Notes |
|-----------|----------|------------|-------|-------|
| ESP32-S3 DevKit | 1 | $15 | $15 | Dual-core, WiFi, BLE, 16-bit ADC |
| LiPo Battery 1000mAh | 1 | $8 | $8 | 3.7V rechargeable |
| USB-C Charging Module | 1 | $3 | $3 | TP4056 or similar |
| Voltage Regulator 3.3V | 1 | $2 | $2 | LDO for stable power |

**Subtotal: $28**

---

## EEG Sensors

| Component | Quantity | Unit Price | Total | Notes |
|-----------|----------|------------|-------|-------|
| Dry EEG Electrodes | 8 | $5 | $40 | Conductive rubber or foam |
| ADS1299 EEG AFE | 1 | $45 | $45 | 8-channel, 24-bit ADC |
| Adjustable Headband | 1 | $10 | $10 | Elastic with electrode mounts |
| Electrode Gel (optional) | 1 | $8 | $8 | For improved conductivity |

**Subtotal: $103**

---

## EMG Sensors

| Component | Quantity | Unit Price | Total | Notes |
|-----------|----------|------------|-------|-------|
| Disposable EMG Electrodes | 10 pairs | $0.50 | $5 | Adhesive gel electrodes |
| EMG Amplifier Module | 1 | $12 | $12 | MyoWare or similar |

**Subtotal: $17**

---

## EOG Sensors

| Component | Quantity | Unit Price | Total | Notes |
|-----------|----------|------------|-------|-------|
| EOG Electrodes | 4 | $2 | $8 | Near-eye placement |
| Differential Amplifier | 1 | $8 | $8 | For EOG signal conditioning |

**Subtotal: $16**

---

## PPG Sensor

| Component | Quantity | Unit Price | Total | Notes |
|-----------|----------|------------|-------|-------|
| MAX30102 PPG Sensor | 1 | $5 | $5 | Heart rate + SpO2 |
| Finger Clip Enclosure | 1 | $3 | $3 | 3D printed or purchased |

**Subtotal: $8**

---

## Output & Feedback

| Component | Quantity | Unit Price | Total | Notes |
|-----------|----------|------------|-------|-------|
| OLED Display 128x64 | 1 | $8 | $8 | I2C interface |
| Vibration Motor | 1 | $2 | $2 | Haptic feedback |
| Buzzer (optional) | 1 | $1 | $1 | Audio feedback |
| LED Indicators | 3 | $0.20 | $0.60 | Status lights |

**Subtotal: $11.60**

---

## Miscellaneous

| Component | Quantity | Unit Price | Total | Notes |
|-----------|----------|------------|-------|-------|
| PCB (custom or protoboard) | 1 | $10 | $10 | For assembly |
| Wires & Connectors | 1 set | $5 | $5 | JST, Dupont, etc. |
| Enclosure | 1 | $8 | $8 | 3D printed or purchased |
| Screws & Standoffs | 1 set | $3 | $3 | M3 hardware |

**Subtotal: $26**

---

## Grand Total

**Base System**: ~$210  
**With Cost Optimization**: ~$150-180  
- Use cheaper EEG AFE alternatives
- 3D print enclosures
- Bulk purchase discounts

---

## Alternative Low-Cost Options

### Budget EEG (<$100 total)
- Replace ADS1299 with ADS1115 (4-channel, 16-bit) - $10
- Reduce to 4 EEG channels instead of 8
- Use OpenBCI-compatible designs

### DIY Approach
- OpenBCI Cyton Board - $200 (includes 8-channel EEG)
- Add EMG/EOG/PPG separately
- Total: ~$250 but more reliable

---

## Suppliers

- **Adafruit**: Sensors, modules, batteries
- **SparkFun**: EEG/EMG components
- **AliExpress**: Low-cost alternatives
- **Digi-Key/Mouser**: Professional components
- **OpenBCI**: Complete BCI boards

---

## Notes

- Prices as of 2026-04, subject to change
- Bulk discounts available for 10+ units
- Medical-grade components cost 2-5x more
- Custom PCB reduces assembly complexity

---

**Version**: 1.0  
**Last Updated**: 2026-04-27
