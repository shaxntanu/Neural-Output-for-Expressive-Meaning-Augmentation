# NOEMA Project Structure

## Repository Overview

**NOEMA** (Neural Output for Expressive Meaning Augmentation) is a biosignal intelligence research initiative focused on silent communication and adaptive human interfaces. This repository contains documentation, research materials, hardware designs, firmware, and a web-based signal sandbox for prototyping.

---

## Directory Structure

```
NOEMA/
├── README.md                          # Main project overview
├── LICENSE                            # MIT License
├── .gitignore                         # Git ignore rules (.vscode, logs, OS files)
│
├── docs/                              # Documentation
│   ├── architecture.md                # System architecture design
│   ├── brain-visualization-feature.md # Brain viz implementation docs
│   ├── concept-note.md                # Core concept documentation
│   ├── glossary.md                    # Technical terminology
│   ├── references-feature.md          # Scientific references feature docs
│   ├── simulation-neuroscience-rules.md # Neuroscience simulation logic
│   ├── simulation-refactor-summary.md # Refactor documentation
│   ├── timelines.md                   # Project timeline
│   └── meeting-notes/                 # Meeting documentation
│       └── PROJECT_STRUCTURE.md       # This comprehensive structure doc
│
├── research/                          # Research materials
│   ├── hypotheses.md                  # Research hypotheses
│   ├── literature-review.md           # Literature review
│   ├── papers/                        # Research papers
│   └── summaries/                     # Paper summaries
│
├── hardware/                          # Physical hardware designs
│   ├── block-diagrams/                # System block diagrams
│   ├── circuits/                      # Circuit schematics
│   ├── pcb/                           # PCB designs
│   ├── bom/                           # Bill of materials
│   └── enclosure/                     # Enclosure designs
│
├── hardware-simulation/               # 🆕 Hardware Simulation Lab
│   ├── README.md                      # Hardware sim documentation
│   │
│   ├── docs/                          # Simulation documentation
│   │   ├── architecture.md            # Simulation architecture
│   │   ├── data-flow.md               # Data flow diagrams
│   │   └── future-hardware-mapping.md # Hardware integration plans
│   │
│   ├── python-signal-lab/             # Python signal processing lab
│   │   ├── main.py                    # Main entry point
│   │   ├── signal_generator.py        # Synthetic signal generation
│   │   ├── filters.py                 # Digital filters (bandpass, notch)
│   │   ├── command_patterns.py        # Command detection patterns
│   │   ├── visualizer.py              # Real-time visualization
│   │   ├── requirements.txt           # Python dependencies
│   │   └── outputs/                   # Generated plots and logs
│   │
│   ├── embedded-core/                 # C++ embedded core logic
│   │   ├── noema_core.h               # Core header
│   │   ├── noema_core.cpp             # Core implementation
│   │   ├── commands.h                 # Command definitions
│   │   └── test_main.cpp              # Test harness
│   │
│   ├── esp32-firmware/                # ESP32 firmware prototype
│   │   ├── noema_esp32.ino            # Arduino sketch
│   │   ├── config.h                   # Configuration
│   │   ├── display.h/cpp              # Display driver
│   │   └── serial_input.h/cpp         # Serial communication
│   │
│   └── datasets/                      # Simulation datasets
│       ├── synthetic/                 # Synthetic test data
│       └── logs/                      # Experiment logs
│
├── firmware/                          # Production embedded firmware
│   ├── esp32/                         # ESP32 firmware
│   ├── sensors/                       # Sensor drivers
│   └── data-logging/                  # Data logging code
│
├── software/                          # Software components
│   ├── preprocessing/                 # Signal preprocessing
│   ├── models/                        # ML models
│   ├── training/                      # Training scripts
│   └── dashboard/                     # Dashboard application
│
├── datasets/                          # Real data storage
│   ├── raw/                           # Raw signal data
│   ├── processed/                     # Processed data
│   ├── labels/                        # Data labels
│   └── notes/                         # Dataset notes
│
├── experiments/                       # Experimental results
│   ├── exp-001-baseline/              # Baseline experiments
│   ├── exp-002-command-detection/     # Command detection
│   ├── exp-003-state-detection/       # State detection
│   └── results-log.md                 # Experiment results log
│
├── media/                             # Media assets
│   ├── diagrams/                      # Diagrams and infographics
│   │   └── NOEMA Infographic.png      # Main project infographic
│   ├── photos/                        # Photos
│   └── videos/                        # Videos
│
├── paper/                             # Research paper
│   ├── draft.md                       # Paper draft
│   ├── submission-plan.md             # Publication plan
│   └── figures/                       # Paper figures
│
└── web-simulation/                    # NOEMA Signal Sandbox (Web App)
    ├── package.json                   # NPM dependencies
    ├── tsconfig.json                  # TypeScript config
    ├── vite.config.ts                 # Vite build config
    ├── tailwind.config.js             # Tailwind CSS config
    ├── index.html                     # HTML entry point
    ├── README.md                      # Sandbox documentation
    │
    ├── src/                           # Source code
    │   ├── main.tsx                   # Application entry
    │   ├── App.tsx                    # Main app component
    │   ├── index.css                  # Global styles
    │   ├── types.ts                   # TypeScript type definitions
    │   │
    │   ├── components/                # React components
    │   │   ├── AnalyticsPanel.tsx     # Analytics display
    │   │   ├── BrainVisualization.tsx # 2D SVG brain visualization
    │   │   ├── ControlPanel.tsx       # State control panel
    │   │   ├── DisclaimerPanel.tsx    # Scientific disclaimer
    │   │   ├── ExplanationPanel.tsx   # State explanation panel
    │   │   ├── ExportPanel.tsx        # Data export functionality
    │   │   ├── PresetPanel.tsx        # State presets
    │   │   ├── ReferencesPanel.tsx    # Scientific references
    │   │   └── SignalChart.tsx        # Signal waveform charts
    │   │
    │   └── utils/                     # Utility functions
    │       ├── signalGenerator.ts     # Synthetic signal generation
    │       └── analytics.ts           # Signal analytics calculations
    │
    └── dist/                          # Build output (generated)
```

---

## 🆕 Hardware Simulation Lab

### Purpose
Bridge the gap between web simulation and real hardware by creating a Python/C++ environment that mimics embedded signal processing.

### Components

#### 1. **Python Signal Lab** (`python-signal-lab/`)
- **signal_generator.py**: Multi-channel synthetic EEG generation
- **filters.py**: Bandpass, notch, and artifact removal filters
- **command_patterns.py**: Pattern matching for command detection
- **visualizer.py**: Real-time matplotlib visualization
- **main.py**: Orchestrates signal flow and testing

**Tech Stack**: NumPy, SciPy, Matplotlib, Python 3.x

#### 2. **Embedded Core** (`embedded-core/`)
- **noema_core.cpp**: Core C++ logic for signal processing
- **commands.h**: Command definitions and thresholds
- **test_main.cpp**: Unit testing framework

**Purpose**: Validate algorithms that will run on microcontrollers

#### 3. **ESP32 Firmware** (`esp32-firmware/`)
- **noema_esp32.ino**: Arduino-compatible firmware
- **display.cpp**: OLED/LCD display driver
- **serial_input.cpp**: Serial communication for testing

**Purpose**: Prototype firmware for ESP32 development boards

---

## Web Simulation Architecture

### Technology Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

### Core Components

#### 1. **App.tsx** - Main Application
- Manages global state (cognitive intent, emotional state, eye state)
- Orchestrates signal generation and analytics
- Renders all panels and visualizations

#### 2. **Signal Generation** (`utils/signalGenerator.ts`)
- Multi-band EEG simulation (Delta, Theta, Alpha, Beta, Gamma)
- Channel-specific signal generation (Frontal, Motor, Temporal, Occipital, Physiological)
- State-driven modulation based on cognitive and emotional states
- Artifact simulation (blinks, jaw clenches)

#### 3. **Analytics** (`utils/analytics.ts`)
- Real-time signal analysis
- Metrics: Stress Index, Internal Focus, External Vigilance, Signal Stability
- Band power calculations
- Intent confidence estimation

#### 4. **Brain Visualization** (`BrainVisualization.tsx`)
- Interactive 2D SVG brain with 5 regions
- State-responsive animations
- Hover tooltips with region information
- Activity level indicators

#### 5. **Control Panel** (`ControlPanel.tsx`)
- Cognitive intent selection (Yes, No, Help, Left, Right, Neutral)
- Emotional state selection (Calm, Stressed, Fatigued, Focused, Urgent)
- Eye state toggle (Open/Closed)
- Noise and signal strength sliders
- Artifact triggers (Blink, Jaw Clench)

#### 6. **Signal Charts** (`SignalChart.tsx`)
- Real-time waveform visualization
- 5 channels: Frontal, Motor, Temporal, Occipital, Physiological
- Recharts-based line charts with gradients

#### 7. **Analytics Panel** (`AnalyticsPanel.tsx`)
- Real-time metrics display
- Band power visualization
- Stress and focus indicators

#### 8. **References Panel** (`ReferencesPanel.tsx`)
- Curated neuroscience literature
- 8 foundational papers with tags
- Scientific grounding for simulation logic

---

## Key Features

### Neuroscience-Inspired Simulation

The signal generator implements scientifically-grounded rules:

- **Alpha Rhythm (8-13 Hz)**: Increases with eyes closed, peaks in occipital region
- **Beta Activity (13-30 Hz)**: Increases with cognitive engagement and stress
- **Theta Waves (4-8 Hz)**: Associated with internal focus and meditation
- **Delta Waves (0.5-4 Hz)**: Low-frequency baseline activity
- **Gamma Oscillations (30-100 Hz)**: High-frequency cognitive processing

### State Mappings

**Cognitive Intent**:
- **Neutral**: Baseline activity
- **Yes/No**: Frontal lobe activation
- **Help**: Temporal and frontal activation
- **Left/Right**: Contralateral motor cortex activation

**Emotional State**:
- **Calm**: Reduced beta, increased alpha
- **Stressed**: Elevated beta, reduced alpha
- **Focused**: Frontal and parietal enhancement
- **Fatigued**: Overall reduced activity
- **Urgent**: High-frequency widespread activation

**Eye State**:
- **Open**: Occipital activation (visual processing)
- **Closed**: Occipital suppression, parietal alpha enhancement

---

## Data Flow

### Web Simulation Flow
```
User Input (Controls)
    ↓
State Updates (React State)
    ↓
Signal Generator (50ms intervals)
    ↓
Multi-band EEG Synthesis
    ↓
Channel-specific Modulation
    ↓
Signal Data Points (100 point buffer)
    ↓
Analytics Calculation
    ↓
Visualization Updates (Charts, Brain, Metrics)
```

### Hardware Simulation Flow
```
Python Signal Generator
    ↓
Digital Filtering (Bandpass, Notch)
    ↓
Feature Extraction
    ↓
Command Pattern Matching
    ↓
C++ Core Validation
    ↓
ESP32 Firmware Testing
    ↓
Real-time Visualization
```

---

## Scientific Grounding

The simulation is based on established neuroscience literature:

1. **Berger (1929)** - Alpha rhythm discovery
2. **Klimesch (1999)** - Alpha/theta cognitive relationships
3. **Engel & Fries (2010)** - Beta oscillations
4. **Fries (2009)** - Gamma synchronization
5. **Pfurtscheller & Neuper (2001)** - Motor imagery
6. **Thayer et al. (2012)** - Heart rate variability
7. **Luck (2014)** - Event-related potentials
8. **Makeig et al.** - Independent component analysis

---

## Development Status

**Current Phase**: Early-stage research and prototyping

**Completed**:
- ✅ Repository structure
- ✅ Web-based signal sandbox
- ✅ Multi-band EEG simulation
- ✅ Interactive brain visualization
- ✅ Real-time analytics
- ✅ Scientific references integration
- ✅ State-driven signal modulation
- ✅ Hardware simulation lab (Python + C++ + ESP32)
- ✅ Digital filtering pipeline
- ✅ Command pattern detection

**In Progress**:
- 🔄 Hardware sensor stack selection
- 🔄 Prototype planning
- 🔄 Experimental framework design
- 🔄 ESP32 firmware development

**Planned**:
- 📋 Real EEG data collection
- 📋 Machine learning model training
- 📋 Hardware prototype development
- 📋 Research paper publication

---

## Design Philosophy

1. **Practical over speculative** - Focus on measurable, achievable goals
2. **Low-cost over inaccessible** - Affordable, open-source approach
3. **Measurable over assumed** - Data-driven validation

---

## Deployment

**Live Demo**: Deployed on Vercel
**Repository**: GitHub (private during active development)
**Build**: Automated via Vercel CI/CD

---

## License

MIT License - See LICENSE file for details

---

## Contact & Collaboration

This is an active research project. Detailed implementation methods may remain private during development.

**NOEMA** — Internal signals, external meaning.
