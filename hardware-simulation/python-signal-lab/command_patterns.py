"""
NOEMA Command Pattern Injector
Inject specific command patterns into synthetic signals.
"""

import numpy as np
from signal_generator import SignalGenerator


class CommandPatternInjector:
    """Inject command patterns into biosignals for testing."""
    
    def __init__(self, sample_rate: int = 250):
        self.sample_rate = sample_rate
        self.generator = SignalGenerator(sample_rate)
    
    def inject_pattern(self, signals: dict, pattern_type: str,
                      inject_time: float, total_duration: float) -> dict:
        """
        Inject command pattern into signals.
        
        Args:
            signals: Dictionary of channel signals
            pattern_type: Type of pattern ('blink', 'jaw_short', 'jaw_long', 'double_blink')
            inject_time: Time to inject (seconds)
            total_duration: Total signal duration
            
        Returns:
            Modified signals dictionary
        """
        inject_idx = int(inject_time * self.sample_rate)
        
        if pattern_type == 'blink':
            artifact = self.generator.generate_blink_artifact(0.3)
        elif pattern_type == 'jaw_short':
            artifact = self.generator.generate_jaw_clench(0.6, intensity=1.2)
        elif pattern_type == 'jaw_long':
            artifact = self.generator.generate_jaw_clench(1.8, intensity=1.5)
        elif pattern_type == 'double_blink':
            blink1 = self.generator.generate_blink_artifact(0.3)
            blink2 = self.generator.generate_blink_artifact(0.3)
            gap = np.zeros(int(0.4 * self.sample_rate))
            artifact = np.concatenate([blink1, gap, blink2])
        else:
            return signals
        
        # Inject into frontal channel (most affected by artifacts)
        end_idx = min(inject_idx + len(artifact), len(signals['frontal']))
        artifact_len = end_idx - inject_idx
        signals['frontal'][inject_idx:end_idx] += artifact[:artifact_len]
        
        return signals
