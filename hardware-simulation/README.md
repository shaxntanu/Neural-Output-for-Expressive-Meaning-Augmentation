# NOEMA Hardware Simulation

## Overview

This folder is NOEMA's **pre-hardware development environment**. It enables algorithm and firmware development before physical sensors are purchased, allowing the team to validate signal processing logic, command detection patterns, and embedded system architecture using synthetic biosignals.

## Purpose

The hardware-simulation module bridges the gap between conceptual design and physical implementation by:

1. **Generating realistic synthetic biosignals** (EEG-like, EMG artifacts)
2. **Developing embedded processing algorithms** in portable C++
3. **Prototyping ESP32 firmware** with simulated sensor inputs
4. **Validating command detection logic** before hardware investment

## Architecture

```
hardware-simulation/
├── python-signal-lab/      # Synthetic signal generation & visualization
├── embedded-core/          # Hardware-independent C++ processing logic
├── esp32-firmware/         # Arduino/ESP32 firmware wrapper
├── datasets/               # Generated signals and logs
└── docs/                   # Technical documentation
```

## Workflow

### Phase 1: Signal Generation (Python)
```bash
cd python-signal-lab
python main.py --mode stressed --duration 30
```

Generates synthetic biosignals with realistic characteristics:
- Multi-band EEG (Delta, Theta, Alpha, Beta, Gamma)
- EMG artifacts (blinks, jaw clenches)
- State-dependent modulation (calm, stressed, focused, fatigued)
- Intent patterns (left, right, yes, no, help)

### Phase 2: Algorithm Development (C++)
```bash
cd embedded-core
g++ -std=c++11 test_main.cpp noema_core.cpp parser.cpp classifier.cpp -o noema_test
./noema_test
```

Develops core processing logic:
- Signal parsing and buffering
- Feature extraction
- Pattern recognition
- Command classification

### Phase 3: Firmware Prototyping (ESP32)
```bash
cd esp32-firmware
# Upload to ESP32 via Arduino IDE or PlatformIO
```

Integrates embedded-core with ESP32 peripherals:
- Serial input from Python or sensors
- OLED display output
- LED status indicators
- Bluetooth communication (placeholder)

## Future Hardware Replacement Path

```
Current:  Python Synthetic Stream → Serial → ESP32 Firmware → Commands
Future:   Real EEG/EMG Sensors → ADC → ESP32 Firmware → Commands
```

The embedded-core logic remains unchanged when transitioning to real hardware.

## Scientific Disclaimer

⚠️ **Important**: All signals generated in this module are **synthetic approximations** designed for engineering development and algorithm validation. They are **not medical-grade EEG** and should not be used for clinical or diagnostic purposes.

The synthetic signals are based on established neuroscience literature but simplified for prototyping purposes.

## Getting Started

### Prerequisites

**Python Environment:**
```bash
cd python-signal-lab
pip install -r requirements.txt
```

**C++ Compiler:**
- GCC 7+ or Clang with C++11 support
- Arduino IDE 1.8+ (for ESP32 firmware)

**ESP32 Setup:**
- ESP32 board (optional, for firmware testing)
- Arduino ESP32 board support
- USB cable for serial communication

### Quick Start

1. **Generate synthetic signals:**
   ```bash
   cd python-signal-lab
   python main.py --mode calm --plot
   ```

2. **Test embedded algorithms:**
   ```bash
   cd embedded-core
   g++ -std=c++11 test_main.cpp noema_core.cpp parser.cpp classifier.cpp -o test
   ./test
   ```

3. **Stream to ESP32 (if available):**
   ```bash
   cd python-signal-lab
   python main.py --mode stressed --serial /dev/ttyUSB0
   ```

## Module Details

### python-signal-lab/
- **signal_generator.py**: Multi-band biosignal synthesis
- **filters.py**: Digital filtering (bandpass, notch, smoothing)
- **command_patterns.py**: Intent pattern injection
- **visualizer.py**: Real-time plotting and analysis
- **main.py**: CLI interface for signal generation

### embedded-core/
- **noema_core.cpp/h**: Core signal processing engine
- **parser.cpp/h**: Signal parsing and buffering
- **classifier.cpp/h**: Pattern recognition and command detection
- **commands.h**: Command definitions and thresholds

### esp32-firmware/
- **noema_esp32.ino**: Main Arduino sketch
- **display.cpp/h**: OLED display driver
- **serial_input.cpp/h**: Serial communication handler
- **config.h**: Hardware configuration

## Development Roadmap

- [x] Synthetic signal generation
- [x] Multi-band EEG simulation
- [x] Artifact injection (blinks, jaw clenches)
- [x] State-dependent modulation
- [x] Embedded C++ core logic
- [x] ESP32 firmware skeleton
- [ ] Real-time serial streaming
- [ ] Advanced pattern recognition
- [ ] Machine learning integration
- [ ] Hardware sensor integration

## Contributing

This module is part of the NOEMA research initiative. Development follows the project's design philosophy:
- **Practical over speculative**
- **Low-cost over inaccessible**
- **Measurable over assumed**

## License

MIT License - See root LICENSE file

---

**NOEMA Hardware Simulation** — Engineering the future, one signal at a time.
