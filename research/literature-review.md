# NOEMA Literature Review

## Overview

This document synthesizes key findings from neuroscience, BCI, and human augmentation research that inform NOEMA's design.

---

## A. Imagined Speech EEG

### Key Findings

**Promising in Controlled Settings**
- Lab accuracy: 60-80% for 2-4 word vocabulary
- Requires extensive calibration (30-60 minutes)
- Best results with invasive ECoG, not scalp EEG

**Poor Generalization**
- Cross-subject models: <50% accuracy
- Cross-session degradation: 10-20% drop
- Small participant counts (n=5-20 typical)

**Cue Dependence**
- Performance drops without visual/audio cues
- Self-paced imagined speech is much harder
- Covert speech different from overt speech patterns

### Representative Studies

1. **Dash et al. (2020)** - "Decoding Imagined and Spoken Phrases From Non-invasive Neural Recordings"
   - 4-word vocabulary, 56% accuracy cross-subject
   - ECoG outperforms EEG significantly
   - Conclusion: Scalp EEG insufficient for reliable speech decoding

2. **Cooney et al. (2018)** - "Neurolinguistics Research Advancing Development of a Direct-Speech Brain-Computer Interface"
   - Review of 20+ studies
   - Median accuracy: 65% for binary, 45% for 4-class
   - Motion artifacts major limitation

3. **Martin et al. (2016)** - "Word Pair Classification during Imagined Speech Using Direct Brain Recordings"
   - Invasive ECoG: 88% accuracy
   - Non-invasive EEG: 58% accuracy
   - Gap unlikely to close with current technology

### NOEMA Implications
- **Don't rely on imagined speech alone**
- **Use multimodal signals for robustness**
- **Focus on binary/limited vocabulary**
- **Require personalized calibration**

---

## B. Emotion and Cognitive State Detection

### Key Findings

**Emotional State Alters EEG**
- Alpha power increases with relaxation
- Beta power increases with stress/anxiety
- Theta power associated with meditation
- Gamma bursts during cognitive processing

**Speech Tasks Modulate Brain Activity**
- Frontal activation during speech planning
- Temporal activation during language processing
- Motor cortex during articulation (even imagined)
- Emotional valence affects all of the above

**Physiological Correlates**
- Heart rate variability (HRV) tracks stress
- Pupil dilation indicates cognitive load
- Skin conductance reflects arousal
- Respiration rate changes with emotion

### Representative Studies

1. **Jenke et al. (2014)** - "Feature Extraction and Selection for Emotion Recognition from EEG"
   - Review of emotion recognition methods
   - Best features: PSD in alpha/beta bands
   - Accuracy: 70-85% for valence/arousal

2. **Alarcao & Fonseca (2019)** - "Emotions Recognition Using EEG Signals: A Survey"
   - Multimodal (EEG + physiological) outperforms EEG-only
   - Personalized models essential
   - Real-world accuracy lower than lab

3. **Kreibig (2010)** - "Autonomic Nervous System Activity in Emotion"
   - Comprehensive review of physiological emotion markers
   - HRV most reliable for stress detection
   - Multimodal fusion recommended

### NOEMA Implications
- **Use emotional state as context**
- **Combine EEG with PPG/HRV**
- **Stress detection more reliable than speech**
- **Personalization critical**

---

## C. Motor Imagery BCI

### Key Findings

**Most Reliable BCI Paradigm**
- Left/right hand imagery: 70-90% accuracy
- Requires training (10-20 sessions)
- Common Spatial Patterns (CSP) effective
- Sensorimotor rhythms (mu/beta) well-studied

**Individual Variability**
- 15-30% of users are "BCI illiterate"
- Performance improves with feedback
- Fatigue degrades accuracy
- Motivation affects results

**Multimodal Enhancement**
- Adding EMG improves accuracy 10-20%
- Hybrid P300 + motor imagery works well
- Eye tracking adds robust control channel

### Representative Studies

1. **Pfurtscheller & Neuper (2001)** - "Motor Imagery and Direct Brain-Computer Communication"
   - Foundational work on motor imagery BCI
   - Event-related desynchronization (ERD) in mu/beta bands
   - Training improves performance

2. **Blankertz et al. (2010)** - "The Berlin Brain-Computer Interface: Non-Medical Uses of BCI Technology"
   - CSP for feature extraction
   - 80-90% accuracy for 2-class motor imagery
   - Real-world deployment challenges

3. **Leeb et al. (2015)** - "Thinking Penguin: Multimodal Brain-Computer Interface Control of a VR Game"
   - Hybrid EEG + EOG
   - Improved robustness and user experience
   - Multimodal recommended for practical BCIs

### NOEMA Implications
- **Motor imagery is reliable baseline**
- **Use for Left/Right commands**
- **Combine with EMG for validation**
- **Expect individual variability**

---

## D. Human Augmentation and Sensory Substitution

### Key Findings

**Humans Can Learn New Senses**
- Sensory substitution devices work
- Training period: weeks to months
- Brain plasticity enables adaptation
- Feedback loops accelerate learning

**Successful Examples**
- **Neil Harbisson**: Color-to-sound (eyeborg)
- **Moon Ribas**: Seismic sensor (vibration)
- **BrainPort**: Tongue-based vision for blind
- **Haptic compasses**: Direction sensing

**Design Principles**
- Consistent mapping (stimulus → sensation)
- Immediate feedback
- Gradual complexity increase
- User agency and control

### Representative Studies

1. **Nagel et al. (2005)** - "Beyond Sensory Substitution—Learning the Sixth Sense"
   - Magnetic field sensing via vibrotactile belt
   - Users learned in 6 weeks
   - Became intuitive, automatic

2. **Bach-y-Rita & Kercel (2003)** - "Sensory Substitution and the Human-Machine Interface"
   - Review of sensory substitution devices
   - Brain plasticity enables new sensory channels
   - Feedback essential for learning

3. **Kärcher et al. (2012)** - "Sensory Augmentation for the Blind"
   - Tongue-based vision system
   - Functional after 10 hours training
   - Neural reorganization observed

### NOEMA Implications
- **Haptic feedback for learning**
- **Closed-loop training**
- **Gradual complexity increase**
- **Long-term adaptation possible**

---

## E. Multimodal BCI Systems

### Key Findings

**Hybrid Systems Outperform Single Modality**
- EEG + EMG: 15-30% improvement
- EEG + EOG: More robust to artifacts
- EEG + fNIRS: Better spatial resolution
- Physiological signals add context

**Fusion Strategies**
- Early fusion: Combine raw signals
- Feature-level fusion: Combine features
- Decision-level fusion: Combine predictions
- Weighted fusion based on confidence

**Practical Advantages**
- Redundancy improves reliability
- Fallback when one modality fails
- Richer information for classification
- Better user experience

### Representative Studies

1. **Pfurtscheller et al. (2010)** - "The Hybrid BCI"
   - Comprehensive review of hybrid BCIs
   - Multimodal systems more practical
   - Recommendation: Combine complementary signals

2. **Müller-Putz et al. (2015)** - "Towards Noninvasive Hybrid Brain-Computer Interfaces"
   - EEG + EMG + EOG combination
   - 85% accuracy for 4-class problem
   - Real-world deployment feasible

3. **Yin et al. (2021)** - "A Hybrid Brain-Computer Interface Based on the Fusion of P300 and SSVEP Scores"
   - Decision-level fusion
   - Improved accuracy and information transfer rate
   - Reduced user fatigue

### NOEMA Implications
- **Multimodal is essential, not optional**
- **Use decision-level fusion**
- **Weight by confidence**
- **Design for redundancy**

---

## F. Real-World BCI Challenges

### Key Findings

**Lab-to-Real-World Gap**
- Lab accuracy: 80-90%
- Real-world accuracy: 50-70%
- Motion artifacts major issue
- Environmental noise problematic

**User Factors**
- Fatigue degrades performance
- Motivation affects results
- Learning curve varies widely
- Calibration burden is high

**Technical Limitations**
- Dry electrodes noisier than wet
- Battery life constraints
- Computational limits on edge devices
- Wireless communication latency

### Representative Studies

1. **Lotte et al. (2018)** - "A Review of Classification Algorithms for EEG-based Brain-Computer Interfaces: A 10 Year Update"
   - Comprehensive review of BCI algorithms
   - Real-world performance lower than reported
   - Overfitting common in small datasets

2. **Myrden & Chau (2017)** - "A Passive EEG-BCI for Single-Trial Detection of Changes in Mental State"
   - Real-world deployment study
   - Accuracy drops 15-25% outside lab
   - Artifact rejection critical

3. **Wolpaw & Wolpaw (2012)** - "Brain-Computer Interfaces: Principles and Practice"
   - Authoritative textbook
   - Realistic assessment of BCI state-of-the-art
   - Practical deployment guidelines

### NOEMA Implications
- **Design for real-world conditions**
- **Robust artifact rejection**
- **Manage user expectations**
- **Iterative calibration**

---

## G. Accessibility Applications

### Key Findings

**BCI for Communication**
- P300 spellers: 5-10 words/minute
- Motor imagery: Binary yes/no reliable
- Eye tracking: Fastest, most reliable
- Hybrid systems best for accessibility

**User Needs**
- Reliability > speed
- Ease of use > complexity
- Comfort > performance
- Personalization essential

**Successful Deployments**
- ALS patients using P300 spellers
- Locked-in syndrome communication
- Wheelchair control via motor imagery
- Environmental control (lights, TV)

### Representative Studies

1. **Sellers et al. (2010)** - "A P300-Based Brain-Computer Interface: Initial Tests by ALS Patients"
   - Real ALS patient study
   - 70-80% accuracy achievable
   - Training and support critical

2. **Kübler & Birbaumer (2008)** - "Brain-Computer Interfaces and Communication in Paralysis"
   - Review of BCI for communication
   - Realistic assessment of capabilities
   - User-centered design essential

3. **Vansteensel et al. (2016)** - "Fully Implanted Brain-Computer Interface in a Locked-In Patient with ALS"
   - Long-term implanted BCI
   - Reliable communication achieved
   - Invasive approach necessary for some users

### NOEMA Implications
- **Accessibility is primary use case**
- **Reliability over speed**
- **User-centered design**
- **Long-term support needed**

---

## Synthesis: NOEMA Design Principles

Based on the literature review, NOEMA should:

1. **Use multimodal signals** (EEG + EMG + EOG + PPG)
2. **Focus on limited vocabulary** (2-8 commands)
3. **Require personalized calibration**
4. **Provide haptic feedback** for learning
5. **Design for real-world conditions**
6. **Prioritize reliability over complexity**
7. **Target accessibility applications**
8. **Embrace human augmentation potential**

---

## References

See `research/papers/` for full PDFs and detailed notes.

---

**Last Updated**: 2026-04-27
