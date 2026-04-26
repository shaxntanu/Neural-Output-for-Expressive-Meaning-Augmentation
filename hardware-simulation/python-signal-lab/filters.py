"""
NOEMA Digital Filters
Signal processing filters for biosignal conditioning.
"""

import numpy as np
from scipy import signal
from typing import Tuple


class BiosignalFilters:
    """
    Collection of digital filters for biosignal processing.
    """
    
    @staticmethod
    def bandpass_filter(data: np.ndarray, lowcut: float, highcut: float,
                       sample_rate: int, order: int = 4) -> np.ndarray:
        """
        Apply bandpass Butterworth filter.
        
        Args:
            data: Input signal
            lowcut: Low cutoff frequency (Hz)
            highcut: High cutoff frequency (Hz)
            sample_rate: Sampling rate (Hz)
            order: Filter order
            
        Returns:
            Filtered signal
        """
        nyquist = sample_rate / 2.0
        low = lowcut / nyquist
        high = highcut / nyquist
        
        b, a = signal.butter(order, [low, high], btype='band')
        filtered = signal.filtfilt(b, a, data)
        
        return filtered
    
    @staticmethod
    def notch_filter(data: np.ndarray, freq: float, sample_rate: int,
                    quality: float = 30.0) -> np.ndarray:
        """
        Apply notch filter to remove specific frequency (e.g., 50/60 Hz powerline).
        
        Args:
            data: Input signal
            freq: Frequency to remove (Hz)
            sample_rate: Sampling rate (Hz)
            quality: Quality factor
            
        Returns:
            Filtered signal
        """
        nyquist = sample_rate / 2.0
        freq_norm = freq / nyquist
        
        b, a = signal.iirnotch(freq_norm, quality)
        filtered = signal.filtfilt(b, a, data)
        
        return filtered
    
    @staticmethod
    def lowpass_filter(data: np.ndarray, cutoff: float, sample_rate: int,
                      order: int = 4) -> np.ndarray:
        """
        Apply lowpass Butterworth filter.
        
        Args:
            data: Input signal
            cutoff: Cutoff frequency (Hz)
            sample_rate: Sampling rate (Hz)
            order: Filter order
            
        Returns:
            Filtered signal
        """
        nyquist = sample_rate / 2.0
        normal_cutoff = cutoff / nyquist
        
        b, a = signal.butter(order, normal_cutoff, btype='low')
        filtered = signal.filtfilt(b, a, data)
        
        return filtered
    
    @staticmethod
    def highpass_filter(data: np.ndarray, cutoff: float, sample_rate: int,
                       order: int = 4) -> np.ndarray:
        """
        Apply highpass Butterworth filter.
        
        Args:
            data: Input signal
            cutoff: Cutoff frequency (Hz)
            sample_rate: Sampling rate (Hz)
            order: Filter order
            
        Returns:
            Filtered signal
        """
        nyquist = sample_rate / 2.0
        normal_cutoff = cutoff / nyquist
        
        b, a = signal.butter(order, normal_cutoff, btype='high')
        filtered = signal.filtfilt(b, a, data)
        
        return filtered
    
    @staticmethod
    def moving_average(data: np.ndarray, window_size: int) -> np.ndarray:
        """
        Apply moving average smoothing.
        
        Args:
            data: Input signal
            window_size: Window size in samples
            
        Returns:
            Smoothed signal
        """
        window = np.ones(window_size) / window_size
        smoothed = np.convolve(data, window, mode='same')
        
        return smoothed
    
    @staticmethod
    def remove_baseline_drift(data: np.ndarray, sample_rate: int) -> np.ndarray:
        """
        Remove slow baseline drift using highpass filter.
        
        Args:
            data: Input signal
            sample_rate: Sampling rate (Hz)
            
        Returns:
            Drift-corrected signal
        """
        return BiosignalFilters.highpass_filter(data, 0.5, sample_rate, order=2)
    
    @staticmethod
    def eeg_preprocessing(data: np.ndarray, sample_rate: int,
                         powerline_freq: float = 60.0) -> np.ndarray:
        """
        Standard EEG preprocessing pipeline.
        
        Args:
            data: Raw EEG signal
            sample_rate: Sampling rate (Hz)
            powerline_freq: Powerline frequency to remove (50 or 60 Hz)
            
        Returns:
            Preprocessed signal
        """
        # Remove baseline drift
        processed = BiosignalFilters.remove_baseline_drift(data, sample_rate)
        
        # Remove powerline noise
        processed = BiosignalFilters.notch_filter(processed, powerline_freq, sample_rate)
        
        # Bandpass to EEG range (0.5-50 Hz)
        processed = BiosignalFilters.bandpass_filter(processed, 0.5, 50.0, sample_rate)
        
        return processed
