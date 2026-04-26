"""
NOEMA Signal Generator
Generates realistic synthetic biosignals for algorithm development.
"""

import numpy as np
from typing import Dict, Tuple


class SignalGenerator:
    """
    Multi-band EEG and EMG signal generator with state-dependent modulation.
    
    Generates synthetic biosignals based on established neuroscience principles.
    NOT medical-grade - for engineering development only.
    """
    
    def __init__(self, sample_rate: int = 250):
        """
        Initialize signal generator.
        
        Args:
            sample_rate: Sampling frequency in Hz (default: 250 Hz)
        """
        self.sample_rate = sample_rate
        self.time = 0.0
        self.dt = 1.0 / sample_rate
        
        # EEG band definitions (Hz)
        self.bands = {
            'delta': (0.5, 4.0),
            'theta': (4.0, 8.0),
            'alpha': (8.0, 13.0),
            'beta': (13.0, 30.0),
            'gamma': (30.0, 50.0)
        }
        
        # Base amplitudes (µV)
        self.base_amplitudes = {
            'delta': 75.0,
            'theta': 35.0,
            'alpha': 50.0,
            'beta': 20.0,
            'gamma': 10.0
        }
        
        # State modulation profiles
        self.state_profiles = {
            'calm': {
                'delta': 1.0, 'theta': 1.2, 'alpha': 1.5, 'beta': 0.6, 'gamma': 0.5
            },
            'stressed': {
                'delta': 0.8, 'theta': 0.7, 'alpha': 0.5, 'beta': 1.8, 'gamma': 1.3
            },
            'focused': {
                'delta': 0.7, 'theta': 0.9, 'alpha': 0.8, 'beta': 1.4, 'gamma': 1.2
            },
            'fatigued': {
                'delta': 1.3, 'theta': 1.4, 'alpha': 1.1, 'beta': 0.5, 'gamma': 0.4
            },
            'neutral': {
                'delta': 1.0, 'theta': 1.0, 'alpha': 1.0, 'beta': 1.0, 'gamma': 1.0
            }
        }
        
    def generate_band(self, band_name: str, duration: float, 
                     modulation: float = 1.0) -> np.ndarray:
        """
        Generate a single frequency band signal.
        
        Args:
            band_name: Name of the band ('delta', 'theta', 'alpha', 'beta', 'gamma')
            duration: Duration in seconds
            modulation: Amplitude modulation factor
            
        Returns:
            numpy array of signal samples
        """
        freq_min, freq_max = self.bands[band_name]
        base_amp = self.base_amplitudes[band_name]
        
        n_samples = int(duration * self.sample_rate)
        t = np.linspace(self.time, self.time + duration, n_samples)
        
        # Mix multiple frequencies within the band
        signal = np.zeros(n_samples)
        n_components = 3
        
        for i in range(n_components):
            freq = np.random.uniform(freq_min, freq_max)
            phase = np.random.uniform(0, 2 * np.pi)
            amp = base_amp * modulation * np.random.uniform(0.7, 1.3)
            signal += amp * np.sin(2 * np.pi * freq * t + phase)
        
        signal /= n_components
        
        # Add slow amplitude modulation
        mod_freq = np.random.uniform(0.1, 0.5)
        signal *= (1.0 + 0.2 * np.sin(2 * np.pi * mod_freq * t))
        
        return signal
    
    def generate_multi_band(self, duration: float, state: str = 'neutral') -> np.ndarray:
        """
        Generate multi-band EEG signal.
        
        Args:
            duration: Duration in seconds
            state: Emotional/cognitive state ('calm', 'stressed', 'focused', 'fatigued', 'neutral')
            
        Returns:
            numpy array of combined signal
        """
        profile = self.state_profiles.get(state, self.state_profiles['neutral'])
        
        signal = np.zeros(int(duration * self.sample_rate))
        
        for band_name in self.bands.keys():
            modulation = profile[band_name]
            band_signal = self.generate_band(band_name, duration, modulation)
            signal += band_signal
        
        # Add baseline drift
        t = np.linspace(self.time, self.time + duration, len(signal))
        drift = 5.0 * np.sin(2 * np.pi * 0.05 * t)
        signal += drift
        
        # Add noise
        noise = np.random.normal(0, 3.0, len(signal))
        signal += noise
        
        self.time += duration
        return signal
    
    def generate_blink_artifact(self, duration: float = 0.3) -> np.ndarray:
        """
        Generate eye blink artifact.
        
        Args:
            duration: Blink duration in seconds
            
        Returns:
            numpy array of blink artifact
        """
        n_samples = int(duration * self.sample_rate)
        t = np.linspace(0, duration, n_samples)
        
        # Sharp spike with exponential decay
        amplitude = np.random.uniform(200, 400)
        spike = amplitude * np.exp(-t / 0.1) * np.sin(2 * np.pi * 5 * t)
        
        return spike
    
    def generate_jaw_clench(self, duration: float = 1.0, 
                           intensity: float = 1.0) -> np.ndarray:
        """
        Generate jaw clench EMG artifact.
        
        Args:
            duration: Clench duration in seconds
            intensity: Intensity factor (0.0 to 2.0)
            
        Returns:
            numpy array of jaw clench artifact
        """
        n_samples = int(duration * self.sample_rate)
        
        # High-frequency burst
        amplitude = np.random.uniform(100, 300) * intensity
        burst = amplitude * np.random.normal(0, 1, n_samples)
        
        # Envelope
        t = np.linspace(0, duration, n_samples)
        envelope = np.exp(-((t - duration/2) ** 2) / (2 * (duration/4) ** 2))
        
        return burst * envelope
    
    def generate_channel(self, duration: float, state: str = 'neutral',
                        channel_type: str = 'frontal') -> np.ndarray:
        """
        Generate a single channel with channel-specific characteristics.
        
        Args:
            duration: Duration in seconds
            state: Emotional/cognitive state
            channel_type: Channel location ('frontal', 'motor', 'temporal', 'occipital')
            
        Returns:
            numpy array of channel signal
        """
        base_signal = self.generate_multi_band(duration, state)
        
        # Channel-specific modulation
        if channel_type == 'occipital':
            # Enhance alpha in occipital region
            alpha_boost = self.generate_band('alpha', duration, 1.5)
            base_signal += alpha_boost
        elif channel_type == 'motor':
            # Enhance beta in motor cortex
            beta_boost = self.generate_band('beta', duration, 1.3)
            base_signal += beta_boost
        elif channel_type == 'frontal':
            # Enhance theta and beta in frontal
            theta_boost = self.generate_band('theta', duration, 1.2)
            beta_boost = self.generate_band('beta', duration, 1.2)
            base_signal += theta_boost + beta_boost
        
        return base_signal
    
    def reset_time(self):
        """Reset internal time counter."""
        self.time = 0.0
