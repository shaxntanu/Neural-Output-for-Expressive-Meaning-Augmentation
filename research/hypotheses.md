# NOEMA Research Hypotheses

## Testable Hypotheses

These hypotheses guide NOEMA's experimental design and validation.

---

## H1: Binary Intent Superiority

**Hypothesis**: Binary intent classification (YES/NO) will achieve >85% accuracy, significantly outperforming 4-word imagined speech classification (<60%).

**Rationale**:
- Simpler decision boundary
- Less cognitive load on user
- More robust to noise
- Literature supports binary BCI reliability

**Experimental Design**:
- Within-subject comparison
- 20 participants
- 10 sessions each
- Metrics: Accuracy, ITR, user preference

**Success Criteria**:
- Binary accuracy >85%
- 4-word accuracy <65%
- Statistical significance (p<0.05)

---

## H2: Multimodal Fusion Advantage

**Hypothesis**: EEG + EMG fusion will outperform EEG-only classification by >15% in real-world conditions.

**Rationale**:
- EMG captures jaw/facial muscle activity
- Robust to EEG artifacts
- Complementary information
- Literature shows 15-30% improvement

**Experimental Design**:
- Within-subject comparison
- EEG-only vs EEG+EMG conditions
- Real-world setting (motion, noise)
- 15 participants, 5 sessions each

**Success Criteria**:
- Multimodal improvement >15%
- Reduced false positives
- Better artifact rejection
- Statistical significance (p<0.05)

---

## H3: Personalization Necessity

**Hypothesis**: Personalized models will outperform generic cross-subject models by >20%.

**Rationale**:
- Individual brain variability
- Different skull conductivity
- Personal motor imagery strategies
- Literature shows poor cross-subject generalization

**Experimental Design**:
- Between-subject comparison
- Generic model trained on n-1 subjects
- Personalized model trained on target subject
- 25 participants

**Success Criteria**:
- Personalized accuracy >80%
- Generic accuracy <60%
- Improvement >20%
- Statistical significance (p<0.01)

---

## H4: Haptic Feedback Acceleration

**Hypothesis**: Haptic feedback will reduce calibration time by >30% compared to visual-only feedback.

**Rationale**:
- Closed-loop learning
- Immediate confirmation
- Multisensory integration
- Literature on sensory substitution

**Experimental Design**:
- Between-subject comparison
- Group A: Visual feedback only
- Group B: Visual + haptic feedback
- 30 participants (15 per group)
- Measure time to 80% accuracy

**Success Criteria**:
- Haptic group reaches 80% accuracy faster
- Time reduction >30%
- User preference for haptic
- Statistical significance (p<0.05)

---

## H5: Stress Detection Reliability

**Hypothesis**: PPG-based stress detection will achieve >80% accuracy, outperforming EEG-only stress classification.

**Rationale**:
- Heart rate variability (HRV) is established stress marker
- More robust than EEG
- Less affected by motion
- Physiological signals complement neural

**Experimental Design**:
- Within-subject comparison
- Induced stress (Stroop task, mental arithmetic)
- Baseline vs stress conditions
- 20 participants, 3 sessions each

**Success Criteria**:
- PPG accuracy >80%
- EEG accuracy <70%
- Multimodal (EEG+PPG) >85%
- Statistical significance (p<0.05)

---

## H6: Real-World Robustness

**Hypothesis**: Artifact rejection will maintain >75% accuracy in real-world conditions (walking, talking) compared to >85% in lab conditions.

**Rationale**:
- Motion artifacts degrade EEG
- Real-world noise is unpredictable
- Multimodal fusion provides redundancy
- Realistic performance expectations

**Experimental Design**:
- Within-subject comparison
- Lab condition (seated, quiet)
- Real-world condition (walking, ambient noise)
- 15 participants, 5 sessions each

**Success Criteria**:
- Lab accuracy >85%
- Real-world accuracy >75%
- Degradation <15%
- Artifact rejection >90%

---

## H7: Transfer Learning Efficiency

**Hypothesis**: Transfer learning from population data will reduce personalized calibration time from 30 minutes to <10 minutes while maintaining >80% accuracy.

**Rationale**:
- Pre-trained models capture general patterns
- Fine-tuning adapts to individual
- Reduces user burden
- Practical deployment requirement

**Experimental Design**:
- Between-subject comparison
- Group A: Full calibration (30 min)
- Group B: Transfer learning (10 min)
- 20 participants (10 per group)

**Success Criteria**:
- Both groups achieve >80% accuracy
- Transfer learning group saves >20 minutes
- No significant accuracy difference
- User satisfaction higher for Group B

---

## H8: Command Vocabulary Limit

**Hypothesis**: Classification accuracy will degrade by >10% for each additional command beyond 4 classes.

**Rationale**:
- Increased decision complexity
- More cognitive load
- Smaller margins between classes
- Literature shows accuracy drops with more classes

**Experimental Design**:
- Within-subject comparison
- 2-class, 4-class, 6-class, 8-class conditions
- 15 participants, 10 sessions each
- Measure accuracy vs number of classes

**Success Criteria**:
- 2-class: >85%
- 4-class: >70%
- 6-class: >60%
- 8-class: >50%
- Clear degradation trend

---

## H9: Fatigue Effects

**Hypothesis**: Classification accuracy will degrade by >15% after 30 minutes of continuous use due to mental fatigue.

**Rationale**:
- Sustained attention is difficult
- BCI control is cognitively demanding
- Fatigue affects EEG patterns
- Practical deployment consideration

**Experimental Design**:
- Within-subject comparison
- Measure accuracy every 5 minutes
- 60-minute continuous session
- 15 participants

**Success Criteria**:
- Initial accuracy >80%
- 30-minute accuracy <70%
- 60-minute accuracy <65%
- Significant degradation (p<0.05)

---

## H10: Long-Term Adaptation

**Hypothesis**: Users will improve accuracy by >20% over 10 sessions as they learn to modulate their brain signals.

**Rationale**:
- BCI control is a learned skill
- Brain plasticity enables adaptation
- Feedback accelerates learning
- Literature shows improvement with training

**Experimental Design**:
- Within-subject longitudinal study
- 10 sessions over 2 weeks
- 20 participants
- Measure accuracy progression

**Success Criteria**:
- Session 1 accuracy: ~60%
- Session 10 accuracy: >80%
- Improvement >20%
- Learning curve evident

---

## Secondary Hypotheses

### H11: Age Effects
Younger users (<30) will outperform older users (>50) by >10% due to brain plasticity differences.

### H12: Gaming Experience
Users with gaming experience will learn BCI control 20% faster due to better hand-eye coordination and feedback processing.

### H13: Meditation Practice
Users with meditation experience will achieve 15% higher accuracy due to better attention control and mental state regulation.

### H14: Session Spacing
Daily sessions will produce better long-term retention than massed sessions (3x per week).

### H15: Feedback Modality
Multimodal feedback (visual + haptic + audio) will outperform single-modality feedback by >25%.

---

## Experimental Priorities

**Phase 1 (Current)**:
- H1: Binary vs multiclass
- H2: Multimodal fusion
- H3: Personalization

**Phase 2 (Next 6 months)**:
- H4: Haptic feedback
- H5: Stress detection
- H6: Real-world robustness

**Phase 3 (Next 12 months)**:
- H7: Transfer learning
- H8: Vocabulary limits
- H10: Long-term adaptation

---

## Statistical Methods

- **Within-subject**: Paired t-tests, repeated measures ANOVA
- **Between-subject**: Independent t-tests, ANOVA
- **Longitudinal**: Mixed-effects models, growth curve analysis
- **Significance level**: α = 0.05
- **Power analysis**: Target 80% power, effect size d=0.5

---

## Ethical Considerations

- Informed consent required
- IRB approval for human subjects
- Data privacy and anonymization
- Right to withdraw anytime
- Compensation for participation

---

**Last Updated**: 2026-04-27
