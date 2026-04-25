# References Panel Feature

## Overview
The NOEMA Signal Sandbox now includes a professional, collapsible References & Scientific Basis section that grounds the simulator in established neuroscience literature.

---

## Purpose

To make the project feel:
- Academically grounded
- Research-oriented
- Scientifically credible
- Professionally presented

Without pretending to be a medical tool or overstating capabilities.

---

## Features

### 1. Collapsible Design
- Starts collapsed to avoid overwhelming users
- Clean expand/collapse toggle with chevron icons
- Smooth transitions

### 2. Professional Citation Format
- Numbered references [1-8]
- Author(s), Year, Title format
- Brief explanatory notes for each reference
- No fake DOIs or fabricated citations

### 3. Topical Tags
Each reference includes color-coded tags:
- **EEG** (blue) - General EEG concepts
- **Alpha** (green) - Alpha rhythm research
- **Beta** (yellow) - Beta band activity
- **Gamma** (red) - Gamma oscillations
- **Cognition** (purple) - Cognitive processes
- **Motor Imagery** (teal) - Motor-related signals
- **Stress** (orange) - Stress/arousal physiology
- **Physiology** (pink) - Physiological measures
- **Methods** (indigo) - Research methods
- **Artifacts** (gray) - Signal artifacts

### 4. Disclaimer
Clear statement above references:
> "These references inform broad tendencies used in the synthetic simulator. The generated signals are illustrative only and do not represent real neural measurements."

### 5. Closing Statement
Elegant tagline at the bottom:
> "NOEMA bridges engineering curiosity with neuroscience-inspired experimentation."

---

## Included References

1. **Berger, H. (1929)** - Foundational EEG discovery
2. **Klimesch, W. (1999)** - Alpha/theta and cognition
3. **Engel, A.K. & Fries, P. (2010)** - Beta oscillations
4. **Fries, P. (2009)** - Gamma synchronization
5. **Pfurtscheller, G. & Neuper, C. (2001)** - Motor imagery
6. **Thayer, J.F. et al. (2012)** - Heart rate variability
7. **Luck, S.J. (2014)** - Event-related potentials
8. **Makeig, S. et al. (1996)** - Independent component analysis

---

## UI/UX Details

### Visual Design
- Dark mode friendly
- Premium typography
- Scrollable reference list (max-height: 384px)
- Custom scrollbar styling
- Hover effects on reference cards
- Glass morphism aesthetic matching app theme

### Interaction
- Click header to expand/collapse
- Smooth animations
- Accessible keyboard navigation
- Clear visual hierarchy

### Placement
- Located at bottom of main content area
- Above footer
- Full width within content container
- Integrated seamlessly with existing panels

---

## Technical Implementation

### Component: `ReferencesPanel.tsx`
- React functional component with hooks
- TypeScript typed interfaces
- State management for expand/collapse
- Responsive design
- Reusable reference data structure

### Styling
- Tailwind CSS utilities
- Custom scrollbar classes in `index.css`
- Consistent with app's design system
- Gradient accents matching NOEMA branding

---

## Academic Impact

When professors, researchers, or reviewers open the simulator, they should feel:

✓ "This student is taking scientific grounding seriously"  
✓ "The project acknowledges its limitations appropriately"  
✓ "There's genuine engagement with the literature"  
✓ "This is research-oriented, not just a toy"  

---

## Future Enhancements

Potential additions:
- Link to full papers (if open access)
- Export references as BibTeX
- Filter references by tag
- Add more domain-specific references
- Include review papers
- Add methodology references

---

## Maintenance Notes

When updating references:
1. Keep citations concise and accurate
2. Do NOT fabricate DOIs or links
3. Ensure tags are relevant
4. Maintain chronological diversity (foundational → recent)
5. Balance theoretical and applied references
6. Keep total count manageable (8-12 references ideal)

---

## Conclusion

The References Panel elevates the NOEMA Signal Sandbox from a simple demo to a scientifically-informed research tool, demonstrating academic rigor while maintaining appropriate humility about the simulator's synthetic nature.
