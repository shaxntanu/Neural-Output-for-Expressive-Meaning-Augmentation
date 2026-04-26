"""
NOEMA Signal Lab - Main Interface
Generate and visualize synthetic biosignals for hardware development.
"""

import argparse
import numpy as np
import pandas as pd
from datetime import datetime
from signal_generator import SignalGenerator
from filters import BiosignalFilters
from visualizer import SignalVisualizer
from command_patterns import CommandPatternInjector

def main():
    parser = argparse.ArgumentParser(description='NOEMA Signal Lab - Synthetic Biosignal Generator')
    parser.add_argument('--mode', type=str, default='neutral',
                       choices=['calm', 'stressed', 'focused', 'fatigued', 'neutral'],
                       help='Emotional/cognitive state')
    parser.add_argument('--duration', type=float, default=10.0,
                       help='Signal duration in seconds')
    parser.add_argument('--sample-rate', type=int, default=250,
                       help='Sampling rate in Hz')
    parser.add_argument('--plot', action='store_true',
                       help='Display real-time plot')
    parser.add_argument('--export', type=str, default=None,
                       help='Export CSV filename')
    parser.add_argument('--inject-command', type=str, default=None,
                       choices=['blink', 'jaw_short', 'jaw_long', 'double_blink'],
                       help='Inject command pattern')
    parser.add_argument('--inject-time', type=float, default=5.0,
                       help='Time to inject command (seconds)')
    parser.add_argument('--serial', type=str, default=None,
                       help='Serial port for ESP32 streaming')
    
    args = parser.parse_args()
    
    print("=" * 60)
    print("NOEMA Signal Lab - Synthetic Biosignal Generator")
    print("=" * 60)
    print(f"Mode: {args.mode}")
    print(f"Duration: {args.duration}s")
    print(f"Sample Rate: {args.sample_rate} Hz")
    print("=" * 60)
    
    # Initialize generator
    generator = SignalGenerator(sample_rate=args.sample_rate)
    injector = CommandPatternInjector(sample_rate=args.sample_rate)
    
    # Generate signals for 4 channels
    channels = ['frontal', 'motor', 'temporal', 'occipital']
    signals = {}
    
    for channel in channels:
        print(f"Generating {channel} channel...")
        signal_data = generator.generate_channel(args.duration, args.mode, channel)
        
        # Apply preprocessing
        signal_data = BiosignalFilters.eeg_preprocessing(signal_data, args.sample_rate)
        
        signals[channel] = signal_data
    
    # Inject command pattern if specified
    if args.inject_command:
        print(f"Injecting {args.inject_command} at {args.inject_time}s...")
        signals = injector.inject_pattern(
            signals, args.inject_command, args.inject_time, args.duration
        )
    
    # Create timestamps
    timestamps = np.arange(0, args.duration, 1.0 / args.sample_rate)
    
    # Export to CSV if requested
    if args.export:
        export_path = f"outputs/{args.export}"
        df = pd.DataFrame({
            'timestamp': timestamps,
            'frontal': signals['frontal'],
            'motor': signals['motor'],
            'temporal': signals['temporal'],
            'occipital': signals['occipital']
        })
        df.to_csv(export_path, index=False)
        print(f"Exported to {export_path}")
    
    # Plot if requested
    if args.plot:
        print("Displaying visualization...")
        visualizer = SignalVisualizer()
        visualizer.plot_multi_channel(timestamps, signals, args.mode)
    
    # Serial streaming if requested
    if args.serial:
        print(f"Streaming to {args.serial}...")
        # TODO: Implement serial streaming
        print("Serial streaming not yet implemented")
    
    print("=" * 60)
    print("Generation complete!")
    print("=" * 60)

if __name__ == '__main__':
    main()
