"""
NOEMA Signal Visualizer
Real-time plotting and analysis of biosignals.
"""

import matplotlib.pyplot as plt
import numpy as np


class SignalVisualizer:
    """Visualize multi-channel biosignals."""
    
    def plot_multi_channel(self, timestamps: np.ndarray, signals: dict, state: str):
        """
        Plot multiple channels in subplots.
        
        Args:
            timestamps: Time array
            signals: Dictionary of channel signals
            state: Current state label
        """
        fig, axes = plt.subplots(len(signals), 1, figsize=(12, 8), sharex=True)
        fig.suptitle(f'NOEMA Synthetic Biosignals - State: {state.upper()}', fontsize=14)
        
        colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B']
        
        for idx, (channel, signal) in enumerate(signals.items()):
            axes[idx].plot(timestamps, signal, color=colors[idx], linewidth=0.8)
            axes[idx].set_ylabel(f'{channel.capitalize()}\n(µV)', fontsize=10)
            axes[idx].grid(True, alpha=0.3)
            axes[idx].set_ylim([signal.min() - 20, signal.max() + 20])
        
        axes[-1].set_xlabel('Time (seconds)', fontsize=10)
        plt.tight_layout()
        plt.show()
