# NOEMA Signal Sandbox - Refactor Summary

## Overview
Comprehensive refactor of the biosignal simulation to be more scientifically defensible, less overclaimed, and more realistic for educational/prototyping purposes.

---

## Key Changes Implemented

### 1. Multi-Band Mixture Model ✓
**Before**: Single frequency per emotional state (e.g., Calm = 10 Hz only)  
**After**: All signals are weighted mixtures of 5 frequency bands:
- Delta (1-4 Hz)
- Theta (4-8 Hz)
- Alpha (8-12 Hz)
- Beta (13-30 Hz)
- Gamma-like (30-45 Hz)

**Impact**: More realistic signal generation that reflects how real EEG contains multiple frequency components simultaneously.

---

### 2. Probabilistic State Biasing ✓
**Before**: Deterministic mappings (e.g., "Yes intent adds exactly 15 Hz")  
**After**: Probabilistic tendencies (e.g., "Yes may slightly increase frontal beta consistency")

**Implementation**:
- Each emotional state biases band power weights
- Controlled randomness added to all metrics
- No two runs produce identical signals even with same parameters

---

### 3. Split Focus Metrics ✓
**Before**: Single "Focus Level" that incorrectly decreased when eyes closed  
**After**: Two separate metrics:

#### Internal Focus
- Optimized for: Mental calculation, meditation, memory tasks
- **Eyes Closed**: +15% (reduces external distraction)
- **Eyes Open**: Baseline

#### External Vigilance  
- Optimized for: Environmental monitoring, visual tasks
- **Eyes Open**: +15% (better sensory input)
- **Eyes Closed**: -20% (reduced external awareness)

**Neuroscience Rationale**: Eyes-closed enhances internal attention while reducing external vigilance, not a global focus reduction.

---

### 4. Added Occipital Channel ✓
**New Channel**: Occipital (visual cortex approximation)

**Purpose**: Demonstrate the most robust EEG phenomenon - alpha blocking/enhancement

**Behavior**:
- **Eyes Closed**: Dramatic alpha power increase (+30% weight)
- **Eyes Open**: Alpha suppression (-15% weight)

**Display**: Pink/magenta color (#EC4899) in signal charts

---

### 5. Enhanced Band Power Visualization ✓
**New Feature**: Live frequency band power bars in Analytics Panel

**Display**:
- Delta (purple)
- Theta (blue)
- Alpha (green)
- Beta (yellow)
- Gamma (red)

**Updates**: Real-time based on current state and eye condition

---

### 6. Improved Disclaimer Language ✓
**Before**: Generic warning about synthetic data  
**After**: Scientifically humble, explicit disclaimers:
- NOT real EEG
- NOT medical data
- NOT diagnostic
- Probabilistic approximations only
- Real brains are far more complex

---

### 7. Modular Code Architecture ✓
**Refactored Functions**:
- `generateBandMix()` - Creates multi-band signal components
- `applyStateBias()` - Applies emotional state weights to bands
- Channel-specific generators with regional biases
- Controlled randomness throughout

**Benefits**:
- Easier to understand
- Easier to modify
- Better TypeScript typing
- More maintainable

---

### 8. Subtle Intent Modulation ✓
**Before**: Magical frequency assignments to words  
**After**: Subtle probabilistic modulation

| Intent | Modulation |
|--------|-----------|
| Yes | Slight frontal beta consistency increase |
| No | Brief inhibitory transient |
| Help | Urgency bursts, arousal increase |
| Left | Right motor bias (contralateral) |
| Right | Left motor bias (contralateral) |
| Neutral | No extra modulation |

---

### 9. Artifact Improvements ✓
**Blink Artifact**:
- Duration: 150-250ms (was 200ms fixed)
- Strongest in frontal channel
- Exponential decay

**Jaw Clench Artifact**:
- Broadband EMG (60-100 Hz range, not fixed 80 Hz)
- Strongest in motor + temporal
- 500ms duration

---

### 10. Analytics Enhancements ✓

#### Stress Index
- Based on: variability, beta/gamma power, arousal, artifacts
- Includes controlled randomness

#### Intent Confidence
- Synthetic estimate of signal clarity
- NOT actual BCI classification accuracy
- Explicitly disclaimed

#### Alpha/Beta Ratio
- Properly modulated by eye state
- Eyes closed: ×1.6 increase (robust effect)
- Display normalized to 0-3 range

---

## Updated Documentation

### docs/simulation-neuroscience-rules.md
- Complete rewrite with humble scientific language
- Multi-band mixture model explained
- Probabilistic tendencies instead of deterministic claims
- Split focus metrics documented
- Occipital channel added
- Enhanced disclaimers

---

## Code Files Modified

1. **web-simulation/src/types.ts**
   - Added `occipital` to SignalDataPoint
   - Split `focusLevel` into `internalFocus` and `externalVigilance`
   - Added `bandPowers` object to Analytics

2. **web-simulation/src/utils/signalGenerator.ts**
   - Complete rewrite with multi-band mixture model
   - Added `generateBandMix()` function
   - Added `applyStateBias()` function
   - Added `generateOccipitalChannel()` function
   - Probabilistic modulation throughout
   - Controlled randomness in all channels

3. **web-simulation/src/utils/analytics.ts**
   - Complete rewrite
   - Split focus into `calculateInternalFocus()` and `calculateExternalVigilance()`
   - Added `estimateBandPowers()` function
   - Controlled randomness in all metrics
   - Fixed eyes-closed logic

4. **web-simulation/src/App.tsx**
   - Updated Analytics state initialization
   - Added occipital channel to signal charts

5. **web-simulation/src/components/AnalyticsPanel.tsx**
   - Updated to display split focus metrics
   - Added band power visualization bars
   - Updated icons and colors

6. **web-simulation/src/components/DisclaimerPanel.tsx**
   - More scientifically humble language
   - Explicit disclaimers about limitations
   - Emphasis on synthetic/educational nature

---

## Testing Recommendations

1. **Eyes Closed Test**:
   - Set state to Calm + Eyes Closed
   - Verify: Internal Focus increases, External Vigilance decreases
   - Verify: Occipital channel shows strong alpha (smooth waves)
   - Verify: Alpha/Beta ratio increases significantly

2. **Eyes Open Test**:
   - Set state to Focused + Eyes Open
   - Verify: External Vigilance increases
   - Verify: Occipital channel shows reduced alpha (more irregular)
   - Verify: Alpha/Beta ratio decreases

3. **Randomness Test**:
   - Load same preset twice
   - Verify: Signals look similar but not identical
   - Verify: Metrics vary slightly between runs

4. **Band Power Test**:
   - Switch between Calm → Focused → Stressed
   - Verify: Band power bars update appropriately
   - Calm: High alpha
   - Focused: High beta
   - Stressed: High beta + gamma

5. **Artifact Test**:
   - Trigger blink: Strong frontal spike
   - Trigger jaw clench: Broadband motor/temporal contamination

---

## Scientific Positioning

The refactored simulator now clearly positions itself as:

✓ **Educational tool** for exploring biosignal patterns  
✓ **Prototyping platform** for interface concepts  
✓ **Synthetic data generator** with probabilistic rules  
✓ **Scientifically humble** about its limitations  

✗ NOT a brain model  
✗ NOT medical software  
✗ NOT diagnostic tool  
✗ NOT real EEG data  

---

## Future Enhancement Opportunities

1. **Cross-Channel Coherence**: Add correlations between channels (e.g., frontal-parietal coherence during attention)

2. **Temporal Dynamics**: Add state transition effects (e.g., gradual alpha increase when closing eyes, not instant)

3. **Individual Variability**: Add "subject profiles" with different baseline characteristics

4. **Artifact Library**: Expand artifact types (motion, electrode pop, powerline noise)

5. **Export Enhancements**: Add metadata to exports explaining synthetic nature

6. **Preset Library**: Add scientifically-informed preset scenarios with descriptions

---

## Conclusion

The refactored simulation is now:
- More scientifically defensible
- Less overclaimed
- More realistic (multi-band, probabilistic)
- Better documented
- More maintainable
- Properly humble about limitations

The eyes-closed focus bug is fixed, and the simulator now properly demonstrates that eyes-closed increases internal focus while decreasing external vigilance.
