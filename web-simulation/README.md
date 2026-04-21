# NOEMA Signal Sandbox - Web Simulation

**Synthetic Biosignal Visualization for Cognitive State Prototyping**

A premium interactive platform for simulating and visualizing biosignals inspired by EEG and physiological patterns. Built for the NOEMA research project to prototype cognitive state detection interfaces.

## ⚠️ Important Disclaimer

This platform generates **synthetic illustrative biosignals** for prototyping, visualization, and research planning. These signals are inspired by common EEG and physiological patterns but do **NOT represent real human brain measurements** or medical diagnostics. All data is algorithmically generated for educational and research demonstration purposes only.

## Features

### Control Panel
- **Cognitive Intent**: Yes, No, Help, Left, Right, Neutral
- **Emotional State**: Calm, Stressed, Fatigued, Focused, Urgent
- **Eye State**: Open/Closed toggle
- **Noise Level**: 0-100% slider
- **Signal Strength**: 0-100% slider
- **Event Triggers**: Blink spike and jaw clench artifacts
- **Simulation Controls**: Start/Pause and randomize

### Live Visualizations
- **Multi-Channel Signals**: Frontal, Motor, Temporal, Physiological
- **Real-time Analytics**: Stress index, focus level, signal stability, noise ratio, intent confidence, alpha/beta ratio
- **Brain Region Activity**: Interactive SVG visualization showing active regions
- **Scenario Explanation**: Dynamic text explaining current signal patterns

### Scenario Presets
- Meditation (calm, eyes closed)
- Exam Stress (stressed, high noise)
- Silent Yes (focused intent)
- Emergency Help (urgent state)

### Export Tools
- Save scenario snapshots (JSON)
- Export signal data (CSV)
- Export visualizations (PNG)

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Recharts** for signal visualization
- **Lucide React** for icons
- **Vite** for build tooling

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The build output will be in the `dist` folder, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## Deployment

This application is configured for deployment on Vercel. The build command is `npm run build` and the output directory is `dist`.

## Design Philosophy

The application features a premium neurotech aesthetic with:
- Dark mode default
- Glassmorphism UI elements
- Smooth animations and transitions
- Professional typography
- MIT lab / Apple-inspired design
- Responsive layout

## Signal Generation

Signals are generated using mathematical models that combine:
- Base sine waves at different frequencies
- Harmonic components
- Noise injection
- State-dependent modulation
- Event-triggered artifacts (blinks, jaw clenches)

Different cognitive and emotional states modify:
- Frequency content (alpha, beta, theta-like patterns)
- Amplitude stability
- Noise characteristics
- Regional emphasis

## Project Structure

```
web-simulation/
├── src/
│   ├── components/          # React components
│   │   ├── AnalyticsPanel.tsx
│   │   ├── BrainVisualization.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── DisclaimerPanel.tsx
│   │   ├── ExplanationPanel.tsx
│   │   ├── ExportPanel.tsx
│   │   ├── PresetPanel.tsx
│   │   └── SignalChart.tsx
│   ├── utils/              # Utility functions
│   │   ├── analytics.ts    # Analytics calculations
│   │   └── signalGenerator.ts  # Signal generation logic
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── index.html
└── README.md
```

## Part of NOEMA Project

This web simulation is part of the larger NOEMA (Neural Output for Expressive Meaning Augmentation) research project. For more information about the full project, see the main repository README.

## License

Research prototype for NOEMA project. All rights reserved.
